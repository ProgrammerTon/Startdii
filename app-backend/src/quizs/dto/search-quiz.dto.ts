import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchQuizDto {
  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  tags: string[] = [];
}
