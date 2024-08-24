import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Tag } from '../../tags/entities/tag.entity';

export class UpdateSourceDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  published?: boolean;

  @IsOptional()
  tags?: Tag[];
}
