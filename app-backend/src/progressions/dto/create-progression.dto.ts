import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateProgressionDto {
  @ApiProperty()
  @IsInt()
  current_progress: number;

}
