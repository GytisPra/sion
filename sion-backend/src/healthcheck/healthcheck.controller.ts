import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { LoggerService } from 'sion-logger';

@Controller()
export class HealthcheckController {
  constructor(private logger: LoggerService) {
    this.logger.layer = 'Healthcheck';
  }

  @HttpCode(200)
  @Post('/healthcheck')
  async healtcheck() {
    this.logger.development.info('Healthcheck performed. Service is healthy.', {
      involved: 'healthcheck',
    });
  }
}
