import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../entities/auth.entities';
import { ROLES_KEY } from '../decorator/role.decorator';

// flow
// client -> jwtAuthGuard (validate token) (attact current user in the token)
// -> rolegurd check if the current user role match the required role

@Injectable()
export class RoleGuard implements CanActivate {
  //reflector read the metadata
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
        context.getHandler(), // method level metadata
        context.getClass(), // class level metadata
      ],
    );

    if (!requiredRole) {
      return true;
    }

    // it is attatch to the auth guard and receives user data from it
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasRequired = requiredRole.some((role) => role === user.role);

    if (!hasRequired) {
      throw new ForbiddenException('Forbiden from entering');
    }

    return true;
  }
}
