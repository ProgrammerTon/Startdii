import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../entities/source.entity';

export class CreateSourceDto {
  @ApiProperty()
  @IsNotEmpty()
  ownerId: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description: string = '';

  @ApiProperty()
  @IsOptional()
  published: Status = Status.private;

  @ApiProperty()
  @IsOptional()
  guildId: ObjectId;

  @ApiProperty()
  @IsOptional()
  content: string = '';

  @ApiProperty()
  @IsOptional()
  filename: string;

  @ApiProperty()
  @IsOptional()
  originalname: string;

  @ApiProperty()
  @IsOptional()
  tags: string[] = [];
}
