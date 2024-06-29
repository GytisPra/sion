import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl:
    process.env.NODE_ENV === 'dev'
      ? false
      : {
          rejectUnauthorized: false,
        },
  cli: {
    migrationsDir: __dirname + '/../migrations',
  },
};

export = typeOrmConfig;
