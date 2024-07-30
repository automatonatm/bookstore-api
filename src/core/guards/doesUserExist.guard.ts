import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '@app/modules/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    const userExist = await this.userService.findOneByEmail(request.body.email);
    if (userExist) {
      throw new BadRequestException('This email already exist');
    }
    return true;
  }
}
