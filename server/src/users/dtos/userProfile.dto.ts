import { ArgsType, Field, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileRequestDto extends PickType(User, ['id'], ArgsType) {}
