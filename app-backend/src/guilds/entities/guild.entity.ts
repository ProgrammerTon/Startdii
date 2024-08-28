import { ObjectId} from 'mongodb';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GuildDocument = Guild & Document;

@Schema({ timestamps: true })
export class Guild {
  @Prop({ type: ObjectId, auto: true })
  id: ObjectId;

  @Prop({ type: ObjectId, name: 'chatId', auto: true })
  chatId: ObjectId;

  @Prop({ name: 'inviteCode' })
  inviteCode: string;
  
  @Prop({ type: [ObjectId], name: 'memberIdList', ref: 'User' })
  memberIdList: ObjectId[];

  @Prop({ type: ObjectId, name: 'leaderId' })
  leaderId: ObjectId;

  @Prop({ type: [ObjectId], name: 'viceLeaderIdList' })
  viceLeaderIdList: ObjectId[];

  @Prop({ name: 'name' })
  name: string;

  @Prop({ name: 'description' })
  description: string;

  @Prop({ name: 'cover' })
  cover: number;
}

export const GuildSchema = SchemaFactory.createForClass(Guild);

