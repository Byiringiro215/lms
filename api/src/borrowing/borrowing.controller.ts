import {
  Controller,
  Post,
  Param,
  Get,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from '../book/dto/create-borrowing.dto';
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
import { Borrowing } from '../entities/borrowing.entity';

@ApiTags('Borrowings')
@Controller('borrowings')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('STUDENT', 'TEACHER')
  @Post('borrow')
  @ApiOperation({
    summary: 'Borrow a book (Students: 3 books max, Teachers: unlimited)',
  })
  @ApiResponse({
    status: 201,
    description: 'Book borrowed successfully',
    type: Borrowing,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request: Book not available, overdue items exist, or student borrowing limit reached',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'string',
          example: 'Book not available for borrowing',
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only students and teachers can borrow books',
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
    description: 'Not Found: Book or user not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Book or user not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiBody({ type: CreateBorrowingDto })
  @ApiCookieAuth('jwt')
  @UsePipes(new ValidationPipe())
  async borrow(
    @Body() createBorrowingDto: CreateBorrowingDto,
    @Request() req,
  ): Promise<Borrowing> {
    return this.borrowingService.borrow(createBorrowingDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('return/:borrowingId')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiResponse({
    status: 200,
    description: 'Book returned successfully',
    schema: {
      type: 'object',
      properties: {
        returned: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Borrowing not found or already returned',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Borrowing not found or already returned',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden: Users can only return their own books unless they are librarians',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'You are not authorized to return this book',
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiParam({
    name: 'borrowingId',
    description: 'Borrowing ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiCookieAuth('jwt')
  async returnBook(
    @Param('borrowingId') borrowingId: string,
    @Request() req,
  ): Promise<boolean> {
    return this.borrowingService.returnBook(borrowingId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get borrowing history for a user' })
  @ApiResponse({
    status: 200,
    description: 'List of borrowings retrieved successfully',
    type: [Borrowing],
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden: Users can only view their own borrowing history unless they are librarians',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example:
            "You are not authorized to view this user's borrowing history",
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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
  @ApiCookieAuth('jwt')
  async findBorrowingsByUser(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() req,
  ): Promise<Borrowing[]> {
    return this.borrowingService.findBorrowingsByUser(
      userId,
      req.user,
      page,
      limit,
    );
  }
}
