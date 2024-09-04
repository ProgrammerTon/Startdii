import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyCommentDto {
  @ApiProperty()
  ownerId?: ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateCommentDto {
  @ApiProperty()
  ownerId?: ObjectId;

  @ApiProperty()
  sourceId?: ObjectId;

  @ApiProperty()
  quizId?: ObjectId;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @ApiProperty()
  replyComments: CreateReplyCommentDto[];
}
