import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ type: ObjectId, auto: true })
  id?: ObjectId;

  @Prop({ name: 'number', unique: true })
  number: string;

  @Prop({ name: 'title' })
  title: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
