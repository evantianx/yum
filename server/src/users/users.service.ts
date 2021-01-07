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

  async createUser({
    email,
    password,
    role,
  }: CreateUserInputDto): Promise<string | undefined> {
    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return 'Email already exists!';
      }

      await this.users.save(this.users.create({ email, password, role }));
    } catch (e) {
      return "Couldn't create user!";
    }
  }
}
