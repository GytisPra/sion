import { HttpException, HttpStatus } from '@nestjs/common';

import { VALIDATION_ERROR } from '.';

export class ValidationException extends HttpException {
  constructor(validationErrors: { [type: string]: string }[]) {
    super(
      VALIDATION_ERROR(
        validationErrors.reduce((current, next) => {
          return { ...current, ...next };
        }, {}),
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
