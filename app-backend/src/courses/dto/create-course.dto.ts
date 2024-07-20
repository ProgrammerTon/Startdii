import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCourseDto {
  @IsNumberString()
  number: string;

  @IsNotEmpty()
  title: string;
}
