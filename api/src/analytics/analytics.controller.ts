import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { UseRole } from '../common/decorators/user-role.decorator';
import { Role } from '../common/types/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiCookieAuth,
} from '@nestjs/swagger';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('top-borrowed')
  @ApiOperation({ summary: 'Get top borrowed books (Accountant only)' })
  @ApiResponse({
    status: 200,
    description: 'List of top borrowed books retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          book: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              title: { type: 'string', example: 'The Great Gatsby' },
              author: { type: 'string', example: 'F. Scott Fitzgerald' },
              isbn: { type: 'string', example: '9780743273565' },
              category: { type: 'string', example: 'NOVEL' },
            },
          },
          borrowCount: { type: 'number', example: 15 },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only accountants can access analytics',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 5,
    description: 'Number of top books to retrieve',
  })
  @ApiQuery({
    name: 'userRole',
    enum: Role,
    required: true,
    description: 'Role of the requesting user',
  })
  @ApiCookieAuth('jwt')
  async getTopBorrowedBooks(
    @Query('limit') limit: number = 5,
    @UseRole() userRole: Role,
  ) {
    return this.analyticsService.getTopBorrowedBooks(limit, userRole);
  }

  @Get('overdue')
  @ApiOperation({
    summary: 'Get overdue borrowings (Accountant only)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of overdue borrowings retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          },
          borrowDate: {
            type: 'string',
            format: 'date-time',
            example: '2023-06-01T00:00:00Z',
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            example: '2023-06-15T00:00:00Z',
          },
          status: {
            type: 'string',
            example: 'overdue',
            enum: ['active', 'overdue', 'returned'],
          },
          isOverdue: { type: 'boolean', example: true },
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
              },
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john.doe@example.com' },
            },
          },
          book: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              title: { type: 'string', example: 'The Great Gatsby' },
              author: { type: 'string', example: 'F. Scott Fitzgerald' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only accountants can access analytics',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
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
  @ApiQuery({
    name: 'userRole',
    enum: Role,
    required: true,
    description: 'Role of the requesting user',
  })
  @ApiCookieAuth('jwt')
  async getOverdueBorrowings(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @UseRole() userRole: Role,
  ) {
    return this.analyticsService.getOverdueBorrowings(page, limit, userRole);
  }

  @Get('trends')
  @ApiOperation({
    summary: 'Get borrowing trends by user role (Accountant only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Borrowing trends by role retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        STUDENT: { type: 'number', example: 45 },
        TEACHER: { type: 'number', example: 30 },
        ADMIN: { type: 'number', example: 5 },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only accountants can access analytics',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiQuery({
    name: 'userRole',
    enum: Role,
    required: true,
    description: 'Role of the requesting user',
  })
  @ApiCookieAuth('jwt')
  async getBorrowingTrends(@UseRole() userRole: Role) {
    return this.analyticsService.getBorrowingTrends(userRole);
  }
}
