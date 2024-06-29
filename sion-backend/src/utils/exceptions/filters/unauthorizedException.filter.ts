import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'sion-logger';
import { UNAUTHORIZED } from '..';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    this.logger.layer = 'UnauthorizedExceptionFilter';
  }

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.development.info('Unauthorized exception has been handled.', {
      involved: 'unauthorized_exception_filter',
      meta: { error: exception },
    });

    response.status(status).json(UNAUTHORIZED());
  }
}
