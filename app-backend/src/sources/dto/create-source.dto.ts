import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Tag } from '../../tags/entities/tag.entity';
export class CreateSourceDto {
  @IsNotEmpty()
  ownerId: ObjectId;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string = '';

  @IsOptional()
  content: string = '';

  @IsOptional()
  published: boolean = false;

  @IsOptional()
  tags: Tag[] = [];
}
