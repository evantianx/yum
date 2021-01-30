import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from '../base/context.interface';
import { BaseResponseDto } from '../base/dtos/baseResponse.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/logiin.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => RegisterResponseDto)
  async registerUser(
    @Args() registerRequestDto: RegisterRequestDto,
  ): Promise<BaseResponseDto> {
    try {
      return await this.usersService.register(registerRequestDto);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation(() => LoginResponseDto)
  async loginUser(
    @Args() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    try {
      return await this.usersService.login(loginRequestDto);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(() => User)
  me(@Context() { user }: GraphQLContext): User {
    return user;
  }
}
