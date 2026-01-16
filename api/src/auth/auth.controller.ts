import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiCookieAuth,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('login')
  @ApiOperation({ summary: 'Redirect to RCA MIS login' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to RCA MIS login page',
  })
  redirectToRcaMis(@Res() res: Response) {
    const loginUrl = `${this.configService.get<string>('RCA_MIS_LOGIN_URL')}?redirect=${this.configService.get<string>('APP_REDIRECT_URL')}?redirect=%2F&oauth=true`;
    return res.redirect(loginUrl);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user by clearing JWT cookie' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Logged out successfully',
        },
      },
    },
  })
  @ApiCookieAuth('jwt')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true }); // Clear the JWT cookie
    return { message: 'Logged out successfully' };
  }

  @Get('callback')
  @ApiOperation({ summary: 'Handle OAuth callback from RCA MIS' })
  @ApiResponse({
    status: 200,
    description:
      'Authentication successful, returns user data and sets JWT cookie',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Authentication successful',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
            },
            userId: { type: 'string', example: 'student123' },
            email: { type: 'string', example: 'student@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: {
              type: 'string',
              example: 'STUDENT',
              enum: ['STUDENT', 'TEACHER', 'ADMIN'],
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'No token provided',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: 'No token provided',
        },
      },
    },
  })
  @ApiQuery({
    name: 'token',
    required: true,
    description: 'OAuth token from RCA MIS',
    type: String,
  })
  async handleCallback(@Query('token') token: string, @Res() res: Response) {
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    const { token: jwtToken, user } =
      await this.authService.handleOAuthCallback(token);
    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.status(200).json({ message: 'Authentication successful', user });
  }
}
