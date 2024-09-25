import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProgressionDocument = Progression & Document;

@Schema()
export class Progression {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, required: true, name: 'userId', ref: 'User' })
  userId: ObjectId;

  @Prop({ type: ObjectId, required: true, name: 'goalId', ref: 'Goal' })
  goalId: ObjectId;

  @Prop({ name: 'objective_count', ref: 'Goal'})
  objective_count: number;

  @Prop({ name: 'current_progress'})
  current_progress: number = 0;

}

export const ProgressionSchema = SchemaFactory.createForClass(Progression);