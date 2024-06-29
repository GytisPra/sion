import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { LoggerService } from 'sion-logger';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    super();

    this.logger.layer = 'ExceptionFilter';
  }

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.development.error('SION error has been handled.', {
      event: 'sion_error',
      involved: 'exception_catch',
      meta: { error: exception },
    });
    super.catch(exception, host);
  }
}
