import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from '../base/dtos/response.dto';
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
  }: CreateUserInputDto): Promise<ResponseDto> {
    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return { ok: false, error: 'Email already exists!' };
      }

      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create user!" };
    }
  }
}
