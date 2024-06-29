import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'sion-logger';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { ResetPasswordToken } from '../authentication/resetPasswordToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, ResetPasswordToken]),
    LoggerModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
