import { IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
