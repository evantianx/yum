import { ArgsType, Field, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput extends PickType(User, ['id'], ArgsType) {}
