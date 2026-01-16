import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtPublicKey = configService.get<string>('JWT_PUBLIC_KEY');
    if (!jwtPublicKey) {
      throw new Error('JWT_PUBLIC_KEY is not defined in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token: string | null = null;
          if (req && req.cookies) {
            token = req.cookies['jwt'] as string;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtPublicKey,
    });
  }

  validate(payload: {
    userId: string;
    email: string;
    role: string;
    name: string;
  }) {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  }
}
