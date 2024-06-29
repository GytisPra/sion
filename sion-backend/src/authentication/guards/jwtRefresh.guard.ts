import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TokenRefreshNotAvailable } from '../../utils/exceptions/tokenRefreshNotAvailable.exception';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new TokenRefreshNotAvailable(info);
    }
    return user;
  }
}
