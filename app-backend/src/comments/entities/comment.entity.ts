import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReplyCommentDocument = ReplyComment & Document;

@Schema({ timestamps: true })
export class ReplyComment {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'ownerId', ref: 'User' })
  ownerId: ObjectId;

  @Prop( { name: 'content' })
  content: string;
}

export const ReplyCommentSchema = SchemaFactory.createForClass(ReplyComment);

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'ownerId', ref: 'User' })
  ownerId: ObjectId;

  @Prop({ type: ObjectId, name: 'sourceId' })
  sourceId: ObjectId;

  @Prop({ type: ObjectId, name: 'quizId' })
  quizId: ObjectId;
  
  @Prop({ name: 'content' })
  content: string;

  @Prop({ name: 'score' })
  score: number;

  @Prop({ type: [ReplyCommentSchema], name: 'replyComments', default: [] })
  replyComments: ReplyComment[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
