import { IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  ownerId?: ObjectId;

  @ApiProperty()
  sourceId?: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  score: number;
}
