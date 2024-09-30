import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LevelDocument = Level & Document;

export enum UserTitle {
  Beginner = "Beginner", // lvl 0-9
  Intermediate = "Intermediate", // lvl 10-19
  Advance = "Advance", // lvl 20-29
  Expert = "Expert", // lvl 30-39
  Master = "Master", // lvl 40-49
  StartdiiGod = "StartdiiGod", // lvl 50
}

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

  @Prop({ name: 'user_title' })
  user_title: UserTitle = UserTitle.Beginner;

  @Prop({ name: 'current_rating_exp' })
  current_rating_exp: number = 0;

}

export const LevelSchema = SchemaFactory.createForClass(Level);