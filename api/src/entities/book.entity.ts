import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrowing } from './borrowing.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ example: '1', description: 'Unique identifier for the book' })
  @PrimaryGeneratedColumn()
  id!: string;

  @ApiProperty({
    example: 'The Great Gatsby',
    description: 'Title of the book',
  })
  @Column()
  title!: string;

  @ApiProperty({
    example: 'F. Scott Fitzgerald',
    description: 'Author of the book',
  })
  @Column()
  author!: string;

  @ApiProperty({
    example: '9780743273565',
    description: 'ISBN of the book (unique)',
  })
  @Column({ unique: true })
  isbn!: string;

  @ApiProperty({
    example: 'A classic novel set in the Jazz Age',
    description: 'Book description',
    required: false,
  })
  @Column({ nullable: true })
  description!: string;

  @ApiProperty({
    example: 1925,
    description: 'Year the book was published',
    required: false,
  })
  @Column({ type: 'int', nullable: true })
  publishedYear!: number;

  @ApiProperty({
    example: 5,
    description: 'Total number of copies available in the library',
  })
  @Column({ type: 'int' })
  totalCopies!: number;

  @ApiProperty({
    example: 3,
    description: 'Number of copies currently available for borrowing',
  })
  @Column({ type: 'int' })
  availableCopies!: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Date when the book was added to the system',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ApiProperty({ example: 'NOVEL', description: 'Book category or genre' })
  @Column()
  category!: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Date when the book record was last updated',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ApiProperty({
    type: () => [Borrowing],
    description: 'List of borrowing records for this book',
  })
  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings!: Borrowing[];
}
