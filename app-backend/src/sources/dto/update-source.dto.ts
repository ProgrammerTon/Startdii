import { IsOptional } from 'class-validator';
import { Tag } from '../../tags/entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSourceDto {
  @ApiProperty()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsOptional()
  published?: boolean;

  @ApiProperty()
  @IsOptional()
  tags?: Tag[];
}