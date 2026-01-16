import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Borrowing {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Unique identifier for the borrowing record',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ type: () => User, description: 'User who borrowed the book' })
  @ManyToOne(() => User, (user) => user.borrowings)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ApiProperty({ type: () => Book, description: 'Book that was borrowed' })
  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: 'bookId' })
  book!: Book;

  @ApiProperty({
    example: '2023-07-01T00:00:00Z',
    description: 'Date when the book was borrowed',
  })
  @Column({ type: 'timestamp' })
  borrowDate!: Date;

  @ApiProperty({
    example: '2023-07-15T00:00:00Z',
    description: 'Due date for returning the book',
  })
  @Column({ type: 'timestamp' })
  dueDate!: Date;

  @ApiProperty({
    example: '2023-07-10T00:00:00Z',
    description: 'Date when the book was returned',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  returnDate!: Date;

  @ApiProperty({
    example: 'active',
    description: 'Current status of the borrowing',
    enum: ['active', 'overdue', 'returned'],
  })
  @Column({ enum: ['active', 'overdue', 'returned'], default: 'active' })
  status!: string;

  @ApiProperty({
    example: false,
    description: 'Whether the borrowing is overdue',
  })
  @Column({ type: 'boolean', default: false })
  isOverdue!: boolean;

  @ApiProperty({
    example: '2023-07-01T00:00:00Z',
    description: 'Date when the borrowing record was created',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
