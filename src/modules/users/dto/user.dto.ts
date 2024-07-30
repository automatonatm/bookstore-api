import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
