import { ArgsType, ObjectType, PickType } from '@nestjs/graphql';
import { BaseResponseDto } from '../../base/dtos/baseResponse.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class RegisterRequestDto extends PickType(
  User,
  ['email', 'password', 'role'],
  ArgsType,
) {}

@ObjectType()
export class RegisterResponseDto extends BaseResponseDto {}
