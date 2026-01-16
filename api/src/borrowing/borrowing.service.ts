import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { Borrowing } from '../entities/borrowing.entity';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';
import { ConfigService } from '@nestjs/config';
import { CreateBorrowingDto } from '../book/dto/create-borrowing.dto';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  async borrow(
    createBorrowingDto: CreateBorrowingDto,
    user: { userId: string; role: string },
  ): Promise<Borrowing> {
    const { userId, bookId, dueDate } = createBorrowingDto;

    if (user.userId !== userId) {
      throw new ForbiddenException('You can only borrow books for yourself');
    }

    const foundUser = await this.userRepository.findOne({ where: { userId } });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (foundUser.role === 'STUDENT') {
      const activeBorrowings = await this.borrowingRepository.count({
        where: { user: { userId }, returnDate: IsNull() },
      });
      const borrowLimit = this.configService.get<number>(
        'STUDENT_BORROW_LIMIT',
      );
      if (borrowLimit === undefined || borrowLimit === null) {
        throw new BadRequestException('Student borrow limit is not configured');
      }
      if (activeBorrowings >= borrowLimit) {
        throw new ForbiddenException(
          `Students cannot borrow more than ${borrowLimit} books at a time`,
        );
      }
    }

    const hasOverdue = await this.borrowingRepository.findOne({
      where: { user: { userId }, isOverdue: true, returnDate: IsNull() },
    });
    if (hasOverdue) {
      throw new ForbiddenException('Cannot borrow: Overdue items exist');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book || book.availableCopies <= 0) {
      throw new BadRequestException('Book not available');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Book, bookId, {
        availableCopies: () => 'availableCopies - 1',
      });

      const borrowing = this.borrowingRepository.create({
        user: { userId },
        book: { id: bookId },
        borrowDate: new Date(),
        dueDate: new Date(dueDate),
        isOverdue: false,
      });
      const savedBorrowing = await queryRunner.manager.save(borrowing);

      await queryRunner.commitTransaction();
      return savedBorrowing;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? String((error as any).message)
          : 'Unknown error';
      throw new BadRequestException('Failed to borrow book: ' + errorMessage);
    } finally {
      await queryRunner.release();
    }
  }

  async returnBook(
    borrowingId: string,
    user: { userId: string; role: string },
  ): Promise<boolean> {
    const borrowing = await this.borrowingRepository.findOne({
      where: { id: borrowingId },
      relations: ['user', 'book'],
    });
    if (!borrowing || borrowing.returnDate) {
      throw new NotFoundException('Borrowing not found or already returned');
    }
    if (borrowing.user.userId !== user.userId && user.role !== 'LIBRARIAN') {
      throw new ForbiddenException(
        'You can only return your own borrowed books',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Borrowing, borrowingId, {
        returnDate: new Date(),
      });

      await queryRunner.manager.update(Book, borrowing.book.id, {
        availableCopies: () => 'availableCopies + 1',
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? String((error as any).message)
          : 'Unknown error';
      throw new BadRequestException('Failed to return book: ' + errorMessage);
    } finally {
      await queryRunner.release();
    }
  }

  findBorrowingsByUser(
    userId: string,
    user: { userId: string; role: string },
    page: number = 1,
    limit: number = 10,
  ): Promise<Borrowing[]> {
    if (user.userId !== userId && user.role !== 'LIBRARIAN') {
      throw new ForbiddenException(
        'You can only view your own borrowing history',
      );
    }

    const skip = (page - 1) * limit;
    return this.borrowingRepository.find({
      where: { user: { userId } },
      relations: ['book'],
      select: [
        'id',
        'borrowDate',
        'dueDate',
        'returnDate',
        'isOverdue',
        'book',
      ],
      skip,
      take: limit,
    });
  }
}
