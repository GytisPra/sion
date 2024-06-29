import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    if (err || !user) {
      throw err;
    }
    return user;
  }
}
