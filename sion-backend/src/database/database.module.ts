import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import TypeOrmConfig from './typeorm.config';
// import DatabaseLogger from './databaseLogger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        TypeOrmConfig.getOrmConfig(configService),
    }),
  ],
})
export class DatabaseModule {}
