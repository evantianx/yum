import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/authUser.decorator';
import { GraphQLContext } from '../base/context.interface';
import { BaseResponseDto } from '../base/dtos/baseResponse.dto';
import { EditRequestDto } from './dtos/edit.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { UserProfileRequestDto } from './dtos/userProfile.dto';
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
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User): User {
    return authUser;
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  userProfile(@Args() { id }: UserProfileRequestDto): Promise<User> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async editUser(
    @AuthUser() { id }: User,
    @Args() editRequestDto: EditRequestDto,
  ): Promise<User> {
    return this.usersService.editUser(id, editRequestDto);
  }
}
