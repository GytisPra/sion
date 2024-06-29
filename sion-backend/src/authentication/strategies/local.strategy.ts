import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'sion-logger';

import { AuthenticationService } from '../authentication.service';

import { UserEntity } from '../../users/serializers/users.serializer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authenticationService: AuthenticationService,
    private logger: LoggerService,
  ) {
    super({ usernameField: 'email' });

    this.logger.layer = 'LocalStrategy';
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    this.logger.development.info('Validating user credentials.', {
      involved: 'validate',
      meta: {
        email,
      },
    });

    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
