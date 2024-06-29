import { Body, Controller, Param, Put } from '@nestjs/common';
import { LoggerService } from 'sion-logger';

import { UpdateAccountDetailsDto } from './dto/updateAccountDetails.dto';
import { UpdateAccountDetailsParams } from './dto/updateAccountDetails.params';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'UsersController';
  }

  @Put(':userId/accountDetails')
  async update(
    @Param() params: UpdateAccountDetailsParams,
    @Body() updateAccountDetailsBody: UpdateAccountDetailsDto,
  ) {
    this.logger.development.info({
      involved: 'update_account_details',
      meta: {
        userId: params.userId,
      },
    });

    return this.usersService.updateAccountDetails(
      params.userId,
      updateAccountDetailsBody,
    );
  }
}
