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
  points: number;
  qType: QType;
  choices: string[];
  answers: number[];
}


@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, required: true })
  ownerId: ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop()
  questions: Question[];

  @Prop({ type: String, enum: Object.values(Status), default: Status.private })
  published: Status;

  @Prop({ type: ObjectId, required: false })
  guildId?: ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
