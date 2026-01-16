import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../auth/role.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('LIBRARIAN')
  @Post()
  @ApiOperation({ summary: 'Create a new book (Librarian only)' })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully',
    type: Book,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only librarians can create books',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid data provided',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['title must be a string', 'isbn must not be empty'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiBody({ type: CreateBookDto })
  @ApiCookieAuth('jwt')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createBookDto: CreateBookDto,
    @Request() req,
  ): Promise<Book> {
    return this.bookService.create(createBookDto, req.user.role);
  }

  @Get()
  @ApiOperation({ summary: 'List books with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of books retrieved successfully',
    type: [Book],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Book[]> {
    return this.bookService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Book details retrieved successfully',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Book with ID {id} not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    example: '1',
  })
  async findOne(@Param('id') id: string): Promise<Book | null> {
    return this.bookService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('LIBRARIAN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a book (Librarian only)' })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
    type: Book,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only librarians can update books',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Book with ID {id} not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    example: '1',
  })
  @ApiBody({ type: UpdateBookDto })
  @ApiCookieAuth('jwt')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Request() req,
  ): Promise<Book | null> {
    return this.bookService.update(id, updateBookDto, req.user.role);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('LIBRARIAN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book (Librarian only)' })
  @ApiResponse({
    status: 200,
    description: 'Book deleted successfully',
    schema: {
      type: 'object',
      properties: {
        deleted: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only librarians can delete books',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Book with ID {id} not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    example: '1',
  })
  @ApiCookieAuth('jwt')
  async delete(@Param('id') id: string, @Request() req): Promise<boolean> {
    return this.bookService.delete(id, req.user.role);
  }
}
