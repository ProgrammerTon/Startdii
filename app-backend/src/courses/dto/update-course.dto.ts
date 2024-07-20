import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateCourseDto {
  @IsNumberString()
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  title: string;
}
