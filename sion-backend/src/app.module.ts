import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, LoggerHelper } from 'sion-logger';

import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ItemsModule } from './items/items.module';
import { BidsModule } from './bids/bids.module';
import { AuctionsModule } from './auctions/auctions.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { BullmqModule } from './bullmq/bullmq.module';

import { ExceptionsLoggerFilter } from './utils/exceptions/filters/exceptionsLogger.filter';
import { UnauthorizedExceptionFilter } from './utils/exceptions/filters/unauthorizedException.filter';
import { InternalServerErrorExceptionFilter } from './utils/exceptions/filters/internalError.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        NODE_ENV: Joi.string().default('dev'),
        APP_URL: Joi.string().required(),
        AWS_REGION: Joi.string(),
        AWS_ACCESS_KEY_ID: Joi.string(),
        AWS_SECRET_ACCESS_KEY: Joi.string(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string(),
        AUTO_EXTEND_TIME: Joi.number().required(),
        OAUTH_GOOGLE_ID: Joi.string().required(),
        OAUTH_GOOGLE_SECRET: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        SENDGRID_API_KEY: Joi.string().required(),
        SENDGRID_VERIFICATION_EMAIL_ID: Joi.string().required(),
        SENDGRID_RESET_PASSWORD_EMAIL_ID: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    DatabaseModule,
    AuthenticationModule,
    ItemsModule,
    BidsModule,
    AuctionsModule,
    HealthcheckModule,
    CommentsModule,
    CategoriesModule,
    BullmqModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerHelper).forRoutes('*');
  }
}
