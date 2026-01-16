/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'NOVEL',
        isbn: '1234567890',
        totalCopies: 5,
      };
      const book = { id: 'NOV-uuid', ...createBookDto, availableCopies: 5 };
      mockBookRepository.save.mockResolvedValue(book);
      const result = await controller.create(createBookDto, {
        role: 'LIBRARIAN',
      });
      expect(result).toEqual(book);
      expect(mockBookRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of books', async () => {
      const books = [
        {
          id: 'NOV-uuid',
          title: 'Test Book',
          author: 'Test Author',
          category: 'NOVEL',
          isbn: '1234567890',
          availableCopies: 5,
        },
      ];
      mockBookRepository.find.mockResolvedValue(books);
      const result = await controller.findAll(1, 10);
      expect(result).toEqual(books);
      expect(mockBookRepository.find).toHaveBeenCalledWith({
        select: [
          'id',
          'title',
          'author',
          'category',
          'isbn',
          'availableCopies',
        ],
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const book = {
        id: 'NOV-uuid',
        title: 'Test Book',
        author: 'Test Author',
        category: 'NOVEL',
        isbn: '1234567890',
        availableCopies: 5,
      };
      mockBookRepository.findOne.mockResolvedValue(book);
      const result = await controller.findOne('NOV-uuid');
      expect(result).toEqual(book);
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'NOV-uuid' },
      });
    });

    it('should throw NotFoundException if book not found', async () => {
      mockBookRepository.findOne.mockResolvedValue(null);
      await expect(controller.findOne('NOV-uuid')).rejects.toThrow(
        'Book not found',
      );
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Book' };
      const book = {
        id: 'NOV-uuid',
        title: 'Updated Book',
        author: 'Test Author',
        category: 'NOVEL',
        isbn: '1234567890',
        availableCopies: 5,
      };
      mockBookRepository.findOne.mockResolvedValue(book);
      mockBookRepository.update.mockResolvedValue(undefined);
      mockBookRepository.findOne.mockResolvedValueOnce(book);
      const result = await controller.update('NOV-uuid', updateBookDto, {
        role: 'LIBRARIAN',
      });
      expect(result).toEqual(book);
      expect(mockBookRepository.update).toHaveBeenCalledWith(
        { id: 'NOV-uuid' },
        updateBookDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      mockBookRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await controller.delete('NOV-uuid', { role: 'LIBRARIAN' });
      expect(result).toBe(true);
      expect(mockBookRepository.delete).toHaveBeenCalledWith('NOV-uuid');
    });

    it('should throw NotFoundException if book not found', async () => {
      mockBookRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(
        controller.delete('NOV-uuid', { role: 'LIBRARIAN' }),
      ).rejects.toThrow('Book not found');
    });
  });
});
