import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InsuffiecientRoles } from '../../utils/exceptions/insufficientRoles.exception';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (requiredRoles.some((role) => user.roles?.includes(role))) {
      return true;
    }

    throw new InsuffiecientRoles(requiredRoles, user.roles);
  }
}
