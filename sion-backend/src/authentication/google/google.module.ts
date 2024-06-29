import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'sion-logger';

import { AuthenticationModule } from '../authentication.module';
import { UsersModule } from '../../users/users.module';

import { GoogleAuthenticationController } from './google.controller';
import { GoogleAuthenticationService } from './google.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    forwardRef(() => AuthenticationModule),
    LoggerModule,
  ],
  providers: [GoogleAuthenticationService],
  controllers: [GoogleAuthenticationController],
})
export class GoogleOauthModule {}
