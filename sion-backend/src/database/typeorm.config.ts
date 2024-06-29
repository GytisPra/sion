import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: configService.get('POSTGRES_URL'),
      ssl:
        process.env.NODE_ENV === 'dev'
          ? false
          : {
              rejectUnauthorized: false,
            },
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
      synchronize: process.env.NODE_ENV === 'dev' ? true : false,
    };
  }
}
