import { Module } from '@nestjs/common';
import { LoggerModule } from 'sion-logger';

import { HealthcheckController } from './healthcheck.controller';

@Module({
  controllers: [HealthcheckController],
  imports: [LoggerModule],
})
export class HealthcheckModule {}
