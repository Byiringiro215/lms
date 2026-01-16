import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from '../entities/borrowing.entity';
import { OverdueService } from './overdue.service';
// import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrowing]),
    // AnalyticsModule
  ],
  providers: [OverdueService],
})
export class OverdueModule {}
