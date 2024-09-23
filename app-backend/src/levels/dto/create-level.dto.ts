import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateLevelDto {
  @ApiProperty()
  @IsNotEmpty()
  ownerId: ObjectId;

  @ApiProperty()
  @IsOptional()
  level?: number;

  @ApiProperty()
  @IsOptional()
  current_exp?: number;

  @ApiProperty()
  @IsOptional()
  required_exp?: number;

}
