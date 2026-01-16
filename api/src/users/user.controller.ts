import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../auth/role.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe Updated',
    description: 'User name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'TEACHER',
    description: 'User role',
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],
    required: false,
  })
  role?: string;
}

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile',
    type: User,
  })
  @ApiCookieAuth('jwt')
  getProfile(@Request() req) {
    console.log(req.user);
    return this.userService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('LIBRARIAN')
  @Get()
  @ApiOperation({ summary: 'List all users (Librarian only)' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [User],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only librarians can access user list',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiCookieAuth('jwt')
  findAll(@Request() req) {
    return this.userService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('LIBRARIAN')
  @Get(':userId')
  @ApiOperation({ summary: 'Get a user by ID (Librarian only)' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: User,
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
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only librarians can access user details',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiCookieAuth('jwt')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('LIBRARIAN')
  @Put(':userId')
  @ApiOperation({ summary: 'Update a user (Librarian only)' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: User,
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
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only librarians can update users',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiCookieAuth('jwt')
  update(
    @Param('userId') userId: string,
    @Body() data: Partial<User>,
    @Request() req,
  ) {
    return this.userService.updateUser(userId, data, req.user);
  }
}
