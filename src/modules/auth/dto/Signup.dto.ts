import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'full name' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/, {
    message:
      'Password must be between 8 to 20 characters, contain at least one special character, and at least one number',
  })
  password: string;
}
