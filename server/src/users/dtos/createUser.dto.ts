import { ArgsType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class CreateUserInputDto extends PickType(
  User,
  ['email', 'password', 'role'],
  ArgsType,
) {}
