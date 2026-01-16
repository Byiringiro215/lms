import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../types/role.enum';

export const UseRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ query: { userRole?: Role } }>();
    return request.query.userRole as Role;
  },
);
