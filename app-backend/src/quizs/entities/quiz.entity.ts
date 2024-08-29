import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuizDocument = Quiz & Document;

export enum Status {
  private = 'private',
  public = 'public',
  guild = 'guild',
}

export enum QType {
    choice = 'choice',
    fill = 'fill'
}
export class Question {
  question: string;
  qType: QType;
  choices: string[];
  answers: number[] | number;
}


@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, required: true, name: "ownerId"})
  ownerId: ObjectId;

  @Prop({ type: String, required: true, name: "title" })
  title: string;

  @Prop({ name: "questions" })
  questions: Question[];

  @Prop({ name: "published" })
  published: Status;

  @Prop({ type: ObjectId, required: false })
  guildId: ObjectId;

  @Prop({ name: "tags" })
  tags: string[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
