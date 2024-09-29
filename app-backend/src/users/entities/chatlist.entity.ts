// import { BeforeInsert, BeforeUpdate } from 'typeorm';
// import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ChatListDocument = ChatList & Document;

@Schema({ timestamps: true })
export class ChatList {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ name: 'ownerId', type: ObjectId, ref: 'User' })
  ownerId: ObjectId;

  @Prop({ name: 'userId', type: ObjectId, ref: 'User' })
  userId: ObjectId;

  @Prop({ name: 'chatroom' })
  chatroom: ObjectId;

  @Prop({ name: 'lastMessage', type: ObjectId, ref: 'Chat' })
  lastMessage: ObjectId;
}

export const ChatListSchema = SchemaFactory.createForClass(ChatList);
