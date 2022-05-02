import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Allow,
} from 'class-validator';

export class AuthRegisterDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @Allow(null)
  lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Allow(null)
  age?: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
