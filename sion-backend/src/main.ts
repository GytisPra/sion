import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationException } from './utils/exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auction')
    .setDescription('Auction API description')
    .setVersion('1.0')
    .addServer('/api/v1')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(
          validationErrors.map((error) => error.constraints),
        );
      },
    }),
  );

  app.use(cookieParser());

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
