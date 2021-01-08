import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResponseDto } from '../base/dtos/response.dto';
import { CreateUserInputDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => ResponseDto)
  async createUser(
    @Args() createUserInputDto: CreateUserInputDto,
  ): Promise<ResponseDto> {
    try {
      return await this.usersService.createUser(createUserInputDto);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
