import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'sion-logger';

import { MailService } from './mail.service';
import { SendgridService } from '../sendgrid/sendgrid.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [MailService, SendgridService],
  exports: [MailService],
})
export class MailModule {}
