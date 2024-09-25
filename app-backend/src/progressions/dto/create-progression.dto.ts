import { IsInt, IsNotEmpty } from 'class-validator';
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
  @IsInt()
  current_progress: number;

}
