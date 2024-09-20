import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Status, QType, Question } from '../entities/quiz.entity';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(QType)
  qType: QType;

  @ApiProperty()
  @IsOptional()
  choices: string[] = [];

  @ApiProperty()
  @IsNotEmpty()
  answers: number[] | number;
}

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @ApiProperty()
  @IsOptional()
  published?: Status = Status.private;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  guildId?: ObjectId;

  @ApiProperty()
  @IsOptional()
  tags?: string[] = [];
}
