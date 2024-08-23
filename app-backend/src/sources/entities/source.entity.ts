import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '../../tags/entities/tag.entity';

export type SourceDocument = Source & Document;

@Schema({ timestamps: true })
export class Source {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId })
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
  published: boolean;

  @Prop({ name: 'tags' })
  tags: Tag[];
}

export const SourceSchema = SchemaFactory.createForClass(Source);
