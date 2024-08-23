import { ObjectId} from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'ownerId' })
  ownerId: ObjectId;

  @Prop({ type: ObjectId, name: 'sourceId' })
  sourceId: ObjectId;

  @Prop({ name: 'content' })
  content: string;

  @Prop({ name: 'score' })
  score: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
