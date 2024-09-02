import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  reporterId?: ObjectId;

  @ApiProperty()
  userId?: ObjectId;

  @ApiProperty()
  sourceId?: ObjectId;

  @ApiProperty()
  quizId?: ObjectId;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

