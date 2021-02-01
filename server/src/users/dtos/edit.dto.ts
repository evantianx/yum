import { ArgsType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class EditRequestDto extends PartialType(
  PickType(User, ['email', 'password']),
) {}
