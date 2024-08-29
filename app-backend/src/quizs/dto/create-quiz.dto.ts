import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Status, QType, Question } from '../entities/quiz.entity';
import { ApiProperty } from '@nestjs/swagger';


class QuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  points: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(QType)
  qType: QType;

  @ApiProperty()
  @IsOptional()
  choices: string[] = [];

  @ApiProperty()
  @IsNotEmpty()
  answers: number[];
}

export class CreateQuizDto {
  @IsNotEmpty()
  @IsMongoId()
  ownerId: ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsOptional()
  @IsEnum(Status)
  published?: Status;

  @IsOptional()
  @IsMongoId()
  guildId?: ObjectId;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
