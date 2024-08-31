import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum messageType {
  text = 'Text',
  source = 'Source',
  quiz = 'Quiz',
}

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId })
  chatId: ObjectId;

  @Prop()
  msgType: messageType;

  @Prop({ name: 'message' })
  message?: string;

  @Prop({ type: ObjectId, name: 'sourceId' })
  sourceId?: ObjectId;

  @Prop({ type: ObjectId, name: 'quizId' })
  quizId?: ObjectId;

  @Prop({ type: ObjectId, name: 'userId', ref: 'User' })
  userId: ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
