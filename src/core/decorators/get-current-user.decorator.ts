import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
