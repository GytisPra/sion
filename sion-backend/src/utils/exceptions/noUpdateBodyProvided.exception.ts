import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateItemDto } from '../../items/dto/updateItem.dto';

import { NO_UPDATE_BODY_PROVIDED } from '.';

export class NoUpdateBodyProvided extends HttpException {
  constructor(updateItemBody: UpdateItemDto) {
    super(NO_UPDATE_BODY_PROVIDED({ updateItemBody }), HttpStatus.BAD_REQUEST);
  }
}
