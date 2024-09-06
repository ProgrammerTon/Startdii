import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ name: 'name', unique: true })
  name: string;

  @Prop({ name: 'sources', ref: 'Source' })
  sources: ObjectId[];

  @Prop({ name: 'quizs', ref: 'Quiz' })
  quizs: ObjectId[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
