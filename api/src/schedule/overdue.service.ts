import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Borrowing } from '../entities/borrowing.entity';

@Injectable()
export class OverdueService {
  private readonly logger = new Logger(OverdueService.name);

  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkOverdueBorrowings() {
    this.logger.log('Checking for overdue borrowings...');

    const now = new Date();
    await this.borrowingRepository
      .createQueryBuilder()
      .update(Borrowing)
      .set({ isOverdue: true })
      .where('returnDate IS NULL AND dueDate < :now AND isOverdue = :false', {
        now,
        false: false,
      })
      .execute();

    const overdueBorrowings = await this.borrowingRepository.find({
      where: {
        status: 'active',
        dueDate: LessThan(now),
      },
    });

    for (const borrowing of overdueBorrowings) {
      borrowing.status = 'overdue';
      await this.borrowingRepository.save(borrowing);
      this.logger.log(
        `Marked borrowing ${borrowing.id} as overdue for user ${borrowing.user.userId}`,
      );
    }

    this.logger.log(`Processed ${overdueBorrowings.length} overdue borrowings`);
  }
}
