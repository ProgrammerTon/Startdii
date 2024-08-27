import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Tag } from '../../tags/entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  content: string = '';

  @ApiProperty()
  @IsOptional()
  published: boolean = false;

  @ApiProperty()
  @IsOptional()
  tags: Tag[] = [];
}
