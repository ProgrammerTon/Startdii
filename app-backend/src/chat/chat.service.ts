import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Chat, ChatDocument, Type } from './entities/chat.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,

    private userService: UsersService,
  ) {}

  async create(msg: messageData): Promise<Chat> {
    const chat = new Chat()
    chat.chatId = new Types.ObjectId(msg.rooms as string);
    if(msg.message.type == Type.text) {
      chat.message = msg.message.text;
    }
    if(msg.message.type == Type.source) {
      chat.sourceId = msg.message.sourceId;
    }
    if(msg.message.type == Type.quiz) {
      chat.quizId = msg.message.quizId;
    }
    const user: any = await this.userService.findByUsername(msg.sender)
    chat.userId =  user._id;
    const createdChat = new this.chatModel(chat);
    return createdChat.save();
  }

  async findAll() {
    return this.chatModel.find().exec();
  }

  async findChatRoomByOffset(offset: number, chatId: ObjectId): Promise<Chat[] | null> {
    const size = 10;
    const sources = await this.chatModel
      .find({ chatId: chatId })
      .sort({ createdAt: -1 })
      .exec();
    offset--;
    offset *= size;
    return sources.slice(offset, offset + size);
  }
}

type messageData = {
  rooms: string;
  message: {
      text?: string;
      type: string;
      sourceId?: ObjectId;
      quizId?: ObjectId;
  }
  sender: string;
};


