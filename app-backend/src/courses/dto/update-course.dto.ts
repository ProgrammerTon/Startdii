import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
