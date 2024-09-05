import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SourceDocument = Source & Document;

export enum Status {
  private = "private",
  public = "public",
  guild = "guild"
}

export class Rating {
  score: number = 0;
  count: number = 0;
  rater: ObjectId[] = [];
}

@Schema({ timestamps: true })
export class Source {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'owner', ref: 'User'})
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

  @Prop({ name: "rating" })
  rating: Rating;


  
}

export const SourceSchema = SchemaFactory.createForClass(Source).index({
  title: 'text',
});
