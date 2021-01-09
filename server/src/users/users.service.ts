import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginRequestDto, LoginResponseDto } from './dtos/logiin.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async register({
    email,
    password,
    role,
  }: RegisterRequestDto): Promise<RegisterResponseDto> {
    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return { ok: false, error: 'Email already exists!' };
      }

      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      console.log(e);
      return { ok: false, error: "Couldn't create user!" };
    }
  }

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return { ok: false, error: 'User not found' };
      }

      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch) {
        return { ok: false, error: 'Wrong password' };
      }

      const token = jwt.sign(
        { id: user.id },
        this.config.get('JWT_TOKEN_SECRET'),
      );
      return {
        ok: true,
        token,
      };
    } catch (e) {
      console.log(e);
      return { ok: false, error: "Couldn't create user!" };
    }
  }
}
