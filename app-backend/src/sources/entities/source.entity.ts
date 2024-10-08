import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SourceDocument = Source & Document;

export enum Status {
  private = 'private',
  public = 'public',
  guild = 'guild',
}

@Schema({ timestamps: true })
export class Source {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'owner', ref: 'User' })
  ownerId: ObjectId;

  @Prop({ name: 'title' })
  title: string;

  @Prop({ name: 'description' })
  description: string;

  @Prop({ name: 'file' })
  file: string;

  @Prop({ name: 'content' })
  content: string;

  @Prop({ name: 'published' })
  published: Status;

  @Prop({ name: 'guildId' })
  guildId: ObjectId;

  @Prop({ name: 'tags' })
  tags: string[];

  @Prop({ name: 'filename' })
  filename: string;

  @Prop({ name: 'originalname' })
  originalname: string;

  @Prop({ name: 'rating' })
  rating: { raterId: ObjectId; score: number }[] = [];

  @Prop({ name: 'avg_rating_score' })
  avg_rating_score: number = 0;

  @Prop({ name: 'rating_count' })
  rating_count: number = 0;
}

export const SourceSchema = SchemaFactory.createForClass(Source).index({
  title: 'text',
});
