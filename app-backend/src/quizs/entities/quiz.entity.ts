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
  correct: number = 0;
}


@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, required: true, name: "ownerId", ref: 'User'})
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

  @Prop({ name: "players" })
  players: ObjectId[];

  @Prop({ name: "total_score"})
  total_score: number = 0;

  @Prop({ name: "rating" })
  rating: {raterId: ObjectId, score: number}[] = [];

}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
