import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowingDto {
  @ApiProperty({
    example: 'user-uuid',
    description: 'ID of the user borrowing the book',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    example: 'book-uuid',
    description: 'ID of the book to borrow',
  })
  @IsString()
  @IsNotEmpty()
  bookId!: string;

  @ApiProperty({
    example: '2025-07-01T00:00:00.000Z',
    description: 'Due date for returning the book',
  })
  @IsDateString()
  dueDate!: string;
}
