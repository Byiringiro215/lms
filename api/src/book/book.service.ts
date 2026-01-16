import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookService {
  private readonly categoryPrefixes = {
    Physics: 'PHY',
    MATHEMATICS: 'MATH',
    NOVEL: 'NOV',
    PROGRAMMING: 'PRO',
  };

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, userRole: string): Promise<Book> {
    if (userRole !== 'LIBRARIAN') {
      throw new ForbiddenException('Only librarians can create books');
    }

    const { title, author, category, isbn, totalCopies } = createBookDto;
    if (!this.categoryPrefixes[category]) {
      throw new BadRequestException('Invalid category');
    }

    const existingBook = await this.bookRepository.findOneBy({ isbn });
    if (existingBook) {
      throw new BadRequestException('Book with this ISBN already exists');
    }

    const id = `${this.categoryPrefixes[category]}-${uuidv4()}`;
    const book = this.bookRepository.create({
      id,
      title,
      author,
      category,
      isbn,
      totalCopies,
      availableCopies: totalCopies,
    });

    try {
      return await this.bookRepository.save(book);
    } catch (error: any) {
      throw new BadRequestException(
        'Failed to create book: ' +
          (error?.message || String(error) || 'Unknown error'),
      );
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Book[]> {
    const skip = (page - 1) * limit;
    return this.bookRepository.find({
      select: ['id', 'title', 'author', 'category', 'isbn', 'availableCopies'],
      skip,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    userRole: string,
  ): Promise<Book | null> {
    if (userRole !== 'LIBRARIAN') {
      throw new ForbiddenException('Only librarians can update books');
    }

    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (updateBookDto.isbn && updateBookDto.isbn !== book.isbn) {
      const existingBook = await this.bookRepository.findOneBy({
        isbn: updateBookDto.isbn,
      });
      if (existingBook) {
        throw new BadRequestException(
          'Another book with this ISBN already exists',
        );
      }
    }

    let newId = id;
    if (updateBookDto.category && updateBookDto.category !== book.category) {
      if (!this.categoryPrefixes[updateBookDto.category]) {
        throw new BadRequestException('Invalid category');
      }
      newId = `${this.categoryPrefixes[updateBookDto.category]}-${uuidv4()}`;
    }

    try {
      await this.bookRepository.update({ id }, { ...updateBookDto, id: newId });
      return await this.bookRepository.findOne({ where: { id: newId } });
    } catch (error) {
      throw new BadRequestException('Failed to update book: ' + String(error));
    }
  }

  async delete(id: string, userRole: string): Promise<boolean> {
    if (userRole !== 'LIBRARIAN') {
      throw new ForbiddenException('Only librarians can delete books');
    }

    const result = await this.bookRepository.delete(id);
    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException('Book not found');
    }
    return true;
  }
}
