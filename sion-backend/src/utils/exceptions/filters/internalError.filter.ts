import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'sion-logger';
import { INTERNAL_SERVER_ERROR } from '..';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    this.logger.layer = 'InternalServerErrorExceptionFilter';
  }
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.development.info(
      'Internal server error exception has been handled.',
      {
        meta: { error: exception },
      },
    );

    response.status(status).json(INTERNAL_SERVER_ERROR());
  }
}
