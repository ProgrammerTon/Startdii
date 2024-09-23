import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GoalDocument = Goal & Document;

@Schema()
export class Goal {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ name: 'title' })
  title: string;

  @Prop({ name: 'type' })
  difficulty: string;

  @Prop({ name: 'objective_count' })
  objective_count: number;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);