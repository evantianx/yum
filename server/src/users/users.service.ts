import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { EditRequestDto } from './dtos/edit.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
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

      const token = this.jwt.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (e) {
      console.log(e);
      return { ok: false, error: "Couldn't create user!" };
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.users.findOne(id);
    if (!user)
      throw new NotFoundException(`User with id ${id} doesn't exists `);
    return user;
  }

  async editUser(id: number, editRequestDto: EditRequestDto) {
    console.log(id);
    await this.users.update(id, editRequestDto);
    return this.users.findOne(id);
  }
}
