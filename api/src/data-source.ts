import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const isProduction = process.env.ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: isProduction
    ? configService.getOrThrow<string>('DATABASE_URL_PROD')
    : configService.getOrThrow<string>('DATABASE_URL'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: !isProduction,
  logging: !isProduction,
  ssl: isProduction,
  extra: {
    connectionLimit: 10,
  },
};

export const dataSource = new DataSource(dataSourceOptions);
