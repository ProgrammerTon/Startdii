import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LevelDocument = Level & Document;

@Schema()
export class Level {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, required: true, name: 'ownerId', ref: 'User' })
  ownerId: ObjectId;

  @Prop({ name: 'level' })
  level: number = 0;

  @Prop({ name: 'current_exp' })
  current_exp: number = 0;

  @Prop({ name: 'required_exp' })
  required_exp: number = 25;

  //@Prop({ name: 'rating_exp'})
  //rating_exp: number = 0;

  //@Prop({ name: 'rating_exp_cap'})
  //rating_exp_cap: number = ;
}

export const LevelSchema = SchemaFactory.createForClass(Level);