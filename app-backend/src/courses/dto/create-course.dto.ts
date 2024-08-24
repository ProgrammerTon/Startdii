import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  @IsNumberString()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
