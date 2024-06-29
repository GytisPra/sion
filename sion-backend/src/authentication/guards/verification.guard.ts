import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserIsNotVerified } from '../../utils/exceptions/userIsNotVerified.exception';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.isVerified) {
      return true;
    }

    throw new UserIsNotVerified();
  }
}
