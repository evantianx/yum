import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInputDto, CreateUserOutputDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => CreateUserOutputDto)
  createAccount(@Args() createUserInputDto: CreateUserInputDto) {}
}
