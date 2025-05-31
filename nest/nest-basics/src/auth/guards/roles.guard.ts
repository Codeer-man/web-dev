import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../entities/user.entities';
import { USER_ROLE } from '../decorator/role.decorator';

//* chech if the user role  = protected route reqired role and works as next function of expess

export class RoleGuard implements CanActivate {
  // reflector is a utility thats helps to access metadata
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //retrive the role metabats set by the roles decorator
    const requireRole = this.reflector.getAllAndOverride<UserRole[]>(
      USER_ROLE,
      [
        context.getHandler(), //method level of metadata
        context.getClass(), // class level of metadata
      ],
    );
    if (!requireRole) {
      return true;
    }
    const { user } = context.switchToHttp().getResponse();

    if (!user) {
      throw new ForbiddenException('user not authenticated');
    }

    const hasRequiredRole = requireRole.some((role) => user.role === role);

    if (!hasRequiredRole) {
      throw new ForbiddenException('Insufficient permission');
    }

    return true;
  }
}
