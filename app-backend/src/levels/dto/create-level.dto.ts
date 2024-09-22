import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
  @ApiProperty()
  @IsNotEmpty()
  level: number;

  @ApiProperty()
  @IsNotEmpty()
  current_exp: string;

  @ApiProperty()
  @IsNotEmpty()
  required_exp: string;

}
