import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'The Great Gatsby',
    description: 'Title of the book',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'F. Scott Fitzgerald',
    description: 'Author of the book',
  })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({ example: 'NOVEL' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: '9780743273565', description: 'ISBN of the book' })
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @ApiProperty({ example: 5, description: 'Total number of copies' })
  @IsInt()
  @Min(1)
  totalCopies!: number;
}
