import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum GoalType {
  DoQuiz = 'do_quiz',
  PostQuiz = 'post_quiz',
  PostSource = 'post_source',
}

export type GoalDocument = Goal & Document;

@Schema()
export class Goal {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ name: 'title' })
  title: string;

  @Prop({ name: 'type' })
  type: GoalType;

  @Prop({ name: 'difficulty' })
  difficulty: string;

  @Prop({ name: 'objective_count' })
  objective_count: number;

  @Prop({ name: 'is_weekly_quest' })
  is_weekly_quest: boolean = false;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);