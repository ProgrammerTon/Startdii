import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateProgressionDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  goalId: ObjectId;

  @ApiProperty()
  objective_count: number;

  @ApiProperty()
  current_progress: number;

}
