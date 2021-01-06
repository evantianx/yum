import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateUserInputDto) {
    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return;
      }

      await this.users.save(this.users.create({ email, password, role }));

      return true;
    } catch (e) {
      return;
    }
  }
}
