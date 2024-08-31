import { IsInt, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateGuildDto {
  inviteCode: string;

  leaderId: ObjectId;

  viceLeaderIdList: ObjectId[];

  memberIdList: ObjectId[];

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  cover: number;
}
