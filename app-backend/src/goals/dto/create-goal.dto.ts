import { IsAlpha, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateGoalDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  difficulty: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  objective_count: number;

}