import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/Signup.dto';
import { AuthVerificationDto } from './dto/AuthVerification.dto';
import { AuthService } from './auth.service';
import { DoesUserExist, JwtGuard } from '@app/core/guards';
import { GetUser } from '@app/core/decorators';
import { LoginInputDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOkResponse({
    status: 201,
    type: AuthVerificationDto,
    description: 'Create customer account.',
  })
  @HttpCode(201)
  @UseGuards(DoesUserExist)
  async signup(@Body() user: SignUpDto): Promise<AuthVerificationDto> {
    return await this.authService.createAccount(user);
  }

  @Post('/login')
  @ApiOkResponse({
    status: 200,
    type: AuthVerificationDto,
    description: 'Login customer account.',
  })
  @HttpCode(200)
  async login(@Body() data: LoginInputDto): Promise<AuthVerificationDto> {
    return await this.authService.login(data);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @Get('/me')
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    status: 200,
    description: 'Get authenticated user.',
  })
  @HttpCode(200)
  public async getAuthUser(@GetUser('id') userId: number) {
    return this.authService.getAuthUser(userId);
  }
}
