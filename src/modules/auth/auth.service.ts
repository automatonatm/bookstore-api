import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/Signup.dto';
import { AuthVerificationDto } from './dto/AuthVerification.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async createAccount(user: SignUpDto): Promise<AuthVerificationDto> {
    user.password = await this.hashData(user.password);
    const { id, email } = await this.userService.create(user);

    const token = await this.getTokens(id, email);

    return {
      access_token: token,
      message: 'Account created successfully',
    };
  }

  public async login(data: LoginInputDto): Promise<AuthVerificationDto> {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.getTokens(user.id, user.email);
    return { message: 'Login successful', access_token: token };
  }

  private async getTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        id: userId,
        email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    return accessToken;
  }

  public async getAuthUser(id: number) {
    return await this.userService.findOneById(id);
  }

  private async hashData(password: string) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hashSync(password, salt);
  }
}
