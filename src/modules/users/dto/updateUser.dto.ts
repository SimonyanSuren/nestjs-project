import { IsEmail, IsNotEmpty, MinLength, Allow } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Allow(null)
  lastname?: string;

  @Allow(null)
  age?: number;
}
