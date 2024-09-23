import { IsAlpha, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateLevelDto {
  @ApiProperty()
  @IsNotEmpty()
  ownerId: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  level: number;

  @ApiProperty()
  @IsNotEmpty()
  current_exp: number;

  @ApiProperty()
  @IsNotEmpty()
  required_exp: number;

}
