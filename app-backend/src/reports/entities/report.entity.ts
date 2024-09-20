import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'reporterId', ref: 'User' })
  reporterId: ObjectId;

  @Prop({ type: ObjectId, name: 'userId' })
  userId: ObjectId;

  @Prop({ type: ObjectId, name: 'sourceId' })
  sourceId: ObjectId;

  @Prop({ type: ObjectId, name: 'quizId' })
  quizId: ObjectId;

  @Prop({ name: 'reason' })
  reason: string;

  @Prop({ name: 'description' })
  description: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
