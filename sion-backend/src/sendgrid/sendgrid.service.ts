import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { LoggerService } from 'sion-logger';

@Injectable()
export class SendgridService {
  constructor(
    private readonly configService: ConfigService,
    private logger: LoggerService,
  ) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));
    this.logger.layer = 'SendgridService';
  }

  async send(mail: SendGrid.MailDataRequired) {
    this.logger.development.info('Sending email to user.', {
      involved: 'send_email',
      meta: { userEmail: mail.to },
    });

    try {
      const transport = await SendGrid.send(mail);
      return transport;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
