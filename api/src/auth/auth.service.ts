import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async handleOAuthCallback(token: string) {
    const profileUrl = this.configService.get<string>('RCA_MIS_PROFILE_URL');
    if (!profileUrl) {
      throw new InternalServerErrorException(
        'RCA_MIS_PROFILE_URL not configured',
      );
    }

    try {
      const profileResponse = await axios.get(profileUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = profileResponse.data.data;

      const userId = profileData.user.id;
      const email = profileData.user.email;
      const role = profileData.roles[0].roleName;
      const name =
        `${profileData.person.firstName} ${profileData.person.lastName || ''}`.trim();

      if (!userId || !email || !role || !name) {
        throw new BadRequestException('Incomplete profile data from RCA MIS');
      }
      let user = await this.userRepository.findOneBy({
        userId: profileData.userId,
      });

      if (!user) {
        user = this.userRepository.create({
          userId,
          email,
          role,
          name,
        } as unknown as User);
        await this.userRepository.save(user);
      }

      const payload = { sub: user.userId, role: user.role };
      const accessToken = await this.jwtService.signAsync(payload);

      return { user, token: accessToken };
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const errorMsg =
          error && typeof error === 'object' && 'message' in error
            ? (error as any).message
            : JSON.stringify(error) || 'Unknown error';
        throw new BadRequestException(`Failed to fetch profile: ${errorMsg}`);
      }
      throw new InternalServerErrorException('Authentication error');
    }
  }
}
