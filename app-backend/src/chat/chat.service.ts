import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, ChatDocument, messageType } from './entities/chat.entity';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,

    private userService: UsersService,
  ) {}

  async create(msg: messageData): Promise<Chat> {
    const chat = new Chat();
    chat.chatId = new Types.ObjectId(msg.rooms as string);
    if (msg.type == messageType.text) {
      chat.message = msg.text;
    }
    if (msg.type == messageType.source) {
      chat.sourceId = msg.sourceId;
    }
    if (msg.type == messageType.quiz) {
      chat.quizId = msg.quizId;
    }
    const user: any = await this.userService.findByUsername(msg.sender);
    chat.msgType = msg.type;
    chat.userId = user._id;
    const createdChat = new this.chatModel(chat);
    return createdChat.save();
  }

  async findAll() {
    return this.chatModel.find().exec();
  }

  async findChatRoomByOffset(
    offset: number,
    chatId: ObjectId,
  ): Promise<Chat[] | null> {
    const size = 10;
    const messages = await this.chatModel
      .find({ chatId: chatId })
      .sort({ createdAt: -1 })
      .populate('userId', 'username')
      .exec();
    offset--;
    offset *= size;
    const transformMessages = (messages) => {
      return messages.map((msg) => ({
        text: msg.message,
        sender: msg.userId.username,
        type: 'Text', // Assuming all messages are of type "Text"
        time: new Date(msg.createdAt).toLocaleTimeString().slice(0, 5), // Formats the time as HH:MM
      }));
    };
    const formattedMessages = transformMessages(messages);
    return formattedMessages.slice(offset, offset + size);
  }
}

type messageData = {
  rooms: string;
  type: messageType;
  text?: string;
  sourceId?: ObjectId;
  quizId?: ObjectId;
  sender: string;
};
