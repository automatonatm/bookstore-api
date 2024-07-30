import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({ description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
