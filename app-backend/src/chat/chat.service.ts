import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, ChatDocument, messageType } from './entities/chat.entity';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'mongodb';
import { ChatListService } from 'src/users/chatlist.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    private chatListService: ChatListService,

    private userService: UsersService,
  ) {}

  async create(msg: messageData): Promise<Chat> {
    const chat = new Chat();
    chat.chatId = new Types.ObjectId(msg.rooms as string);
    if (msg.type == messageType.text) {
      chat.message = msg.text;
    }
    if (msg.type == messageType.source) {
      chat.sourceId = new Types.ObjectId(msg.sourceId);
    }
    if (msg.type == messageType.quiz) {
      chat.quizId = new Types.ObjectId(msg.quizId);
    }
    console.log('Sender', msg.sender);
    const user: any = await this.userService.findByExactUsername(msg.sender);
    chat.msgType = msg.type;
    chat.userId = user._id;
    const createdChat = new this.chatModel(chat);
    const savedChat = await createdChat.save();
    if (msg.type === messageType.text) {
      const newUpdate = await this.chatListService.updateChatList(
        chat.chatId,
        savedChat._id,
      );
    }
    let transformChat: any = savedChat;
    if (msg.type == messageType.source) {
      transformChat = this.chatModel
        .findById(savedChat._id)
        .populate('userId', 'username')
        .populate({
          path: 'sourceId',
          select: 'title tags avg_rating_score createdAt',
          populate: {
            path: 'ownerId',
            select: 'username',
          },
        });
    }
    if (msg.type == messageType.quiz) {
      transformChat = await this.chatModel
        .findById(savedChat._id)
        .populate('userId', 'username')
        .populate({
          path: 'quizId',
          select: 'title tags avg_rating_score createdAt',
          populate: {
            path: 'ownerId',
            select: 'username',
          },
        });
    }
    return transformChat;
  }

  async findAll() {
    return this.chatModel.find().exec();
  }

  async findChatRoomByOffset(
    offset: number,
    chatId: ObjectId,
  ): Promise<Chat[] | null> {
    const size = 10;
    offset--;
    offset *= size;
    const messages = await this.chatModel
      .find({ chatId: chatId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(size)
      .populate('userId', 'username')
      .populate({
        path: 'sourceId',
        select: 'title tags avg_rating_score createdAt',
        populate: {
          path: 'ownerId',
          select: 'username',
        },
      })
      .populate({
        path: 'quizId',
        select: 'title tags avg_rating_score createdAt',
        populate: {
          path: 'ownerId',
          select: 'username',
        },
      })
      .exec();
    const transformMessages: any = messages.map((msg: any) => {
      if (msg.msgType === messageType.text) {
        return {
          text: msg.message,
          sender: msg.userId.username,
          type: msg.msgType,
          time: new Date(msg.createdAt).toISOString(), // Formats the time as HH:MM
        };
      }
      if (msg.msgType === messageType.source) {
        return {
          source: msg.sourceId,
          sender: msg.userId.username,
          type: msg.msgType,
          time: new Date(msg.createdAt).toISOString(), // Formats the time as HH:MM
        };
      }
      if (msg.msgType === messageType.quiz) {
        return {
          quiz: msg.quizId,
          sender: msg.userId.username,
          type: msg.msgType,
          time: new Date(msg.createdAt).toISOString(), // Formats the time as HH:MM
        };
      }
    });
    return transformMessages;
  }

  async findAllSource(chatId: ObjectId): Promise<Chat[] | null> {
    const messages = await this.chatModel
      .aggregate([
        {
          $match: {
            msgType: messageType.source,
            chatId: chatId,
          },
        },
        {
          $sort: { createdAt: 1 },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        {
          $unwind: '$userId',
        },
        {
          $lookup: {
            from: 'sources',
            localField: 'sourceId',
            foreignField: '_id',
            as: 'sourceId',
          },
        },
        {
          $unwind: '$sourceId',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sourceId.ownerId',
            foreignField: '_id',
            as: 'sourceId.ownerId',
          },
        },
        {
          $unwind: '$sourceId.ownerId',
        },
        {
          $group: {
            _id: '$sourceId._id',
            chatId: { $last: '$chatId' },
            msgType: { $last: '$msgType' },
            sourceId: { $last: '$sourceId' },
            userId: { $last: '$userId' },
            createdAt: { $last: '$createdAt' },
            updatedAt: { $last: '$updatedAt' },
            __v: { $last: '$__v' },
          },
        },
        {
          $project: {
            chatId: 1,
            msgType: 1,
            'sourceId._id': 1,
            'sourceId.ownerId._id': 1,
            'sourceId.ownerId.username': 1,
            'sourceId.title': 1,
            'sourceId.tags': 1,
            'sourceId.avg_rating_score': 1,
            'sourceId.createdAt': 1,
            'userId._id': 1,
            'userId.username': 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .exec();

    return messages;
  }

  async findSourceByOffset(
    offset: number,
    chatId: ObjectId,
  ): Promise<Chat[] | null> {
    const size = 10;
    offset--;
    offset *= size;
    const messages = await this.chatModel
      .aggregate([
        {
          $match: {
            msgType: messageType.source,
            chatId: chatId,
          },
        },
        {
          $sort: { createdAt: 1 },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        {
          $unwind: '$userId',
        },
        {
          $lookup: {
            from: 'sources',
            localField: 'sourceId',
            foreignField: '_id',
            as: 'sourceId',
          },
        },
        {
          $unwind: '$sourceId',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sourceId.ownerId',
            foreignField: '_id',
            as: 'sourceId.ownerId',
          },
        },
        {
          $unwind: '$sourceId.ownerId',
        },
        {
          $group: {
            _id: '$sourceId._id',
            chatId: { $last: '$chatId' },
            msgType: { $last: '$msgType' },
            sourceId: { $last: '$sourceId' },
            userId: { $last: '$userId' },
            createdAt: { $last: '$createdAt' },
            updatedAt: { $last: '$updatedAt' },
            __v: { $last: '$__v' },
          },
        },
        {
          $project: {
            chatId: 1,
            msgType: 1,
            'sourceId._id': 1,
            'sourceId.ownerId._id': 1,
            'sourceId.ownerId.username': 1,
            'sourceId.title': 1,
            'sourceId.tags': 1,
            'sourceId.avg_rating_score': 1,
            'sourceId.createdAt': 1,
            'userId._id': 1,
            'userId.username': 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: offset,
        },
        {
          $limit: size,
        },
      ])
      .exec();

    return messages;
  }

  async findAllQuiz(chatId: ObjectId): Promise<Chat[] | null> {
    const messages = await this.chatModel
      .aggregate([
        {
          $match: {
            msgType: messageType.quiz,
            chatId: chatId,
          },
        },
        {
          $sort: { createdAt: 1 },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        {
          $unwind: '$userId',
        },
        {
          $lookup: {
            from: 'quizzes',
            localField: 'quizId',
            foreignField: '_id',
            as: 'quizId',
          },
        },
        {
          $unwind: '$quizId',
        },

        {
          $lookup: {
            from: 'users',
            localField: 'quizId.ownerId',
            foreignField: '_id',
            as: 'quizId.ownerId',
          },
        },
        {
          $unwind: '$quizId.ownerId',
        },
        {
          $group: {
            _id: '$quizId._id',
            chatId: { $last: '$chatId' },
            msgType: { $last: '$msgType' },
            quizId: { $last: '$quizId' },
            userId: { $last: '$userId' },
            createdAt: { $last: '$createdAt' },
            updatedAt: { $last: '$updatedAt' },
            __v: { $last: '$__v' },
          },
        },
        {
          $project: {
            chatId: 1,
            msgType: 1,
            'quizId._id': 1,
            'quizId.ownerId._id': 1,
            'quizId.ownerId.username': 1,
            'quizId.title': 1,
            'quizId.tags': 1,
            'quizId.avg_rating_score': 1,
            'quizId.createdAt': 1,
            'userId._id': 1,
            'userId.username': 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .exec();

    return messages;
  }

  async findQuizByOffset(
    offset: number,
    chatId: ObjectId,
  ): Promise<Chat[] | null> {
    const size = 10;
    offset--;
    offset *= size;
    const messages = await this.chatModel
      .aggregate([
        {
          $match: {
            msgType: messageType.quiz,
            chatId: chatId,
          },
        },
        {
          $sort: { createdAt: 1 },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        {
          $unwind: '$userId',
        },
        {
          $lookup: {
            from: 'quizzes',
            localField: 'quizId',
            foreignField: '_id',
            as: 'quizId',
          },
        },
        {
          $unwind: '$quizId',
        },

        {
          $lookup: {
            from: 'users',
            localField: 'quizId.ownerId',
            foreignField: '_id',
            as: 'quizId.ownerId',
          },
        },
        {
          $unwind: '$quizId.ownerId',
        },
        {
          $group: {
            _id: '$quizId._id',
            chatId: { $last: '$chatId' },
            msgType: { $last: '$msgType' },
            quizId: { $last: '$quizId' },
            userId: { $last: '$userId' },
            createdAt: { $last: '$createdAt' },
            updatedAt: { $last: '$updatedAt' },
            __v: { $last: '$__v' },
          },
        },
        {
          $project: {
            chatId: 1,
            msgType: 1,
            'quizId._id': 1,
            'quizId.ownerId._id': 1,
            'quizId.ownerId.username': 1,
            'quizId.title': 1,
            'quizId.tags': 1,
            'quizId.avg_rating_score': 1,
            'quizId.createdAt': 1,
            'userId._id': 1,
            'userId.username': 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: offset,
        },
        {
          $limit: size,
        },
      ])
      .exec();

    return messages;
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
