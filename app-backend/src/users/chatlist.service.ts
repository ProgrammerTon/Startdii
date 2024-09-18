import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { ChatList, ChatListDocument } from './entities/chatlist.entity';
import { CreateChatDto } from './dto/create-chatlist.dto';
import { Types } from 'mongoose';

@Injectable()
export class ChatListService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(ChatList.name)
    private chatListModel: Model<ChatListDocument>,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<ChatList> {
    const chat = plainToInstance(ChatList, createChatDto);
    chat.ownerId = new Types.ObjectId(chat.ownerId);
    chat.userId = new Types.ObjectId(chat.userId);
    chat.chatroom = new Types.ObjectId();

    const existingChat = await this.chatListModel
      .findOne({
        ownerId: chat.ownerId,
        userId: chat.userId,
      })
      .exec();

    if (existingChat) {
      throw Error('Chat already exists');
    }
    const createdChat = new this.chatListModel(chat);

    //save two way
    const newchatCreate = {
      ownerId: chat.userId,
      userId: chat.ownerId,
      chatroom: chat.chatroom,
    };
    const newchat = plainToInstance(ChatList, newchatCreate);
    const createdNewChat = new this.chatListModel(newchat);
    createdNewChat.save();
    return createdChat.save();
  }

  async updateChatList(chatroom: ObjectId, msgId: ObjectId) {
    return await this.chatListModel.updateMany(
      { chatroom }, // Find chat lists by ownerId
      { $set: { lastMessage: msgId } }, // Update lastMessage field
    );
  }

  async findAllChatList(ownerId: ObjectId) {
    return this.chatListModel
      .find({ ownerId })
      .populate('userId')
      .populate('lastMessage')
      .exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}
