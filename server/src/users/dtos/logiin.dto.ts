import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { BaseResponseDto } from '../../base/dtos/baseResponse.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class LoginRequestDto extends PickType(
  User,
  ['email', 'password'],
  ArgsType,
) {}

@ObjectType()
export class LoginResponseDto extends BaseResponseDto {
  @Field(() => String, { nullable: true })
  token?: string;
}
