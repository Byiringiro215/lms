import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Borrowing } from '../entities/borrowing.entity';
import { Book } from '../entities/book.entity';
import { Role } from '../common/types/role.enum';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // Get top borrowed books
  async getTopBorrowedBooks(limit: number = 5, userRole: Role): Promise<any[]> {
    if (userRole !== Role.LIBRARIAN) {
      throw new ForbiddenException('Only accountants can access analytics');
    }

    const result = await this.borrowingRepository
      .createQueryBuilder('borrowing')
      .select('borrowing.bookId', 'bookId')
      .addSelect('COUNT(borrowing.id)', 'borrowCount')
      .groupBy('borrowing.bookId')
      .orderBy('borrowCount', 'DESC')
      .limit(limit)
      .getRawMany();

    const books = await this.bookRepository.find({
      where: { id: In(result.map((r) => r.bookId)) },
      select: ['id', 'title', 'author'],
    });

    return result.map((r) => ({
      book: books.find((b) => b.id === r.bookId),
      borrowCount: parseInt(r.borrowCount),
    }));
  }

  // Get overdue borrowings
  async getOverdueBorrowings(
    page: number = 1,
    limit: number = 10,
    userRole: Role,
  ): Promise<Borrowing[]> {
    if (userRole !== Role.LIBRARIAN) {
      throw new ForbiddenException('Only accountants can access analytics');
    }

    const skip = (page - 1) * limit;
    return this.borrowingRepository.find({
      where: { isOverdue: true },
      select: ['id', 'user', 'book', 'dueDate'],
      skip,
      take: limit,
    });
  }

  // Get borrowing trends by user role
  async getBorrowingTrends(userRole: Role): Promise<any[]> {
    if (userRole !== Role.LIBRARIAN) {
      throw new ForbiddenException('Only accountants can access analytics');
    }

    const result = await this.borrowingRepository
      .createQueryBuilder('borrowing')
      .innerJoin('borrowing.user', 'user')
      .select('user.role', 'role')
      .addSelect('COUNT(borrowing.id)', 'borrowCount')
      .groupBy('user.role')
      .getRawMany();

    return result.map((r) => ({
      role: r.role,
      borrowCount: parseInt(r.borrowCount),
    }));
  }
}
