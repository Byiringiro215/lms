import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { UserModule } from './users/user.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { OverdueModule } from './schedule/overdue.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    NestScheduleModule.forRoot(),
    AuthModule,
    BookModule,
    BorrowingModule,
    UserModule,
    OverdueModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
