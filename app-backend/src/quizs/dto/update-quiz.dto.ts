import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from './create-quiz.dto';
import { ObjectId } from 'mongodb';

export class UpdateQuizDto {
  @ApiProperty()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsOptional()
  questions?: QuestionDto[];

  @ApiProperty()
  @IsOptional()
  published?: boolean;

  @ApiProperty()
  @IsOptional()
  guildId?: ObjectId;

  @ApiProperty()
  @IsOptional()
  tags?: string[];
}
