import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['borrowings'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findAll(requestingUser: { role: string }) {
    if (requestingUser.role !== 'LIBRARIAN') {
      throw new ForbiddenException('Only librarians can list users');
    }
    return this.userRepository.find({ relations: ['borrowings'] });
  }

  async updateUser(
    userId: string,
    data: Partial<User>,
    requestingUser: { role: string },
  ) {
    if (requestingUser.role !== 'LIBRARIAN') {
      throw new ForbiddenException('Only librarians can update user data');
    }
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.update({ userId }, data);
    return this.userRepository.findOneBy({ userId });
  }
}
