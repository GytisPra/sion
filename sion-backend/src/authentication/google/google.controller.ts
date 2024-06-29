import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { LoggerService } from 'sion-logger';

import { TokenVerificationDto } from '../dto/tokenVerification.dto';
import { GoogleAuthenticationService } from './google.service';

@Controller('authentication/google')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'GoogleAuthenticationController';
  }

  @Post()
  async authenticate(@Body() tokenData: TokenVerificationDto) {
    this.logger.development.info({
      involved: 'google_authenticate',
    });
    return this.googleAuthenticationService.authenticate(tokenData);
  }
}
