import { ApiProperty } from '@nestjs/swagger';

export class AuthVerificationDto {
  @ApiProperty({ description: 'message' })
  message: string;
  @ApiProperty({ description: 'access token' })
  access_token: string;
}
