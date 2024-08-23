import { IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateCommentDto {
  ownerId?: ObjectId;

  sourceId?: ObjectId;

  @IsNotEmpty()
  content: string;

  @IsNumber()
  score: number;
}
