import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../../users/users.service';
import { mockedConfigService } from '../../utils/mocks/config.service';
import { mockedJwtService } from '../../utils/mocks/jwt.service';
import { UserEntity } from '../../users/serializers/users.serializer';
import { VerificationToken } from '../verificationToken.entity';
import { MailModule } from '../../mail/mail.module';
import { ResetPasswordToken } from '../resetPasswordToken.entity';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MailModule],
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(VerificationToken),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ResetPasswordToken),
          useValue: {},
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '1';
      expect(typeof authenticationService.generateAccessToken(userId)).toEqual(
        'string',
      );
    });
  });
});
