import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SourceDocument = Source & Document;

@Schema({ timestamps: true })
export class Source {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
