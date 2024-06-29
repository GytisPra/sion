import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'sion-logger';

import { SendgridService } from '../sendgrid/sendgrid.service';

import { UserEntity } from '../users/serializers/users.serializer';

import { VerificationToken } from '../authentication/verificationToken.entity';
import { ResetPasswordToken } from '../authentication/resetPasswordToken.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sendgridService: SendgridService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'MailService';
  }

  async sendVerificationEmail(
    user: UserEntity,
    verificationToken: VerificationToken,
  ) {
    this.logger.development.info({
      involved: 'send_verification_email',
      meta: { userEmail: user.email },
    });

    const mail = {
      to: user.email,
      from: 'siongytispranauskas@gmail.com',
      subject: 'Verification Email',
      templateId: this.configService.get('SENDGRID_VERIFICATION_EMAIL_ID'),
      dynamicTemplateData: {
        subject: 'Verification Email',
        code: verificationToken.code,
        name: user.firstname,
      },
    };

    try {
      const response = await this.sendgridService.send(mail);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async sendResetPasswordEmail(
    user: UserEntity,
    resetPasswordToken: ResetPasswordToken,
  ) {
    this.logger.development.info({
      involved: 'send_reset_password_email',
      meta: { userEmail: user.email },
    });

    const resetPasswordLink = `${this.configService.get(
      'APP_URL',
    )}/authentication/resetPassword/${resetPasswordToken.token}`;

    const mail = {
      to: user.email,
      from: 'siongytispranauskas@gmail.com',
      subject: 'Password Reset',
      templateId: this.configService.get('SENDGRID_RESET_PASSWORD_EMAIL_ID'),
      dynamicTemplateData: {
        subject: 'Password Reset',
        resetPasswordLink,
        name: user.firstname,
      },
    };

    const response = await this.sendgridService.send(mail);
    return response;
  }
}
