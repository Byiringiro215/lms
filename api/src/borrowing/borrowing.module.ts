import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from '../entities/borrowing.entity';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing, User, Book]), ConfigModule],
  providers: [BorrowingService],
  controllers: [BorrowingController],
})
export class BorrowingModule {}
