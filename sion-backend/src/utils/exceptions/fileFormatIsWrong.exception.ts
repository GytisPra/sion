import { HttpException, HttpStatus } from '@nestjs/common';

import { FILE_FORMAT_IS_WRONG } from '.';

export class FileFormatIsWrong extends HttpException {
  constructor(fileType: string, fileName: string) {
    super(FILE_FORMAT_IS_WRONG({ fileType, fileName }), HttpStatus.BAD_REQUEST);
  }
}
