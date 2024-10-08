// import { BeforeInsert, BeforeUpdate } from 'typeorm';
// import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ name: 'email', unique: true })
  email: string;

  @Prop({ name: 'password' })
  password: string;

  @Prop({ name: 'username', unique: true })
  username: string;

  @Prop({ name: 'firstname' })
  firstname: string;

  @Prop({ name: 'lastname' })
  lastname: string;

  @Prop({ name: 'roles' })
  roles: Role[];

  // Inventory section
  @Prop({ name: 'sources', ref: 'Source' })
  sources: ObjectId[];

  @Prop({ name: 'favorite_sources', ref: 'Source' })
  favorite_sources: ObjectId[];

  @Prop({ name: 'quizzes', ref: 'Quiz' })
  quizzes: ObjectId[];

  @Prop({ name: 'character', default: 'Char1' })
  character: string;

  @Prop({ name: 'characterColor', default: '#FCA3E3' })
  characterColor: string;

  @Prop({ name: 'characterHat', default: 'HNone' })
  characterHat: string;

  @Prop({ name: 'code' })
  code: string;

  @Prop({ name: 'favorite_quizzes', ref: 'Quiz' })
  favorite_quizzes: ObjectId[] = [];

  @Prop({ name: 'quizHistory', ref: 'Quiz' })
  quiz_history: {
    id: ObjectId;
    results: boolean[];
    answers: (number | number[])[];
  }[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
