import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuizStatDocument = QuizStat & Document;

export class QuizStat {
  @Prop({ type: ObjectId })
  id: ObjectId;

  @Prop({ name: 'max_score'})
  max_score: number;

  @Prop({ name: 'player_scores'})
  player_scores: number[];

  @Prop({ name: 'players_answers'})
  players_answers: boolean[][]
}

export const QuizStatSchema = SchemaFactory.createForClass(QuizStat).index({
    title: 'text',
  });