import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class CreateUserInputDto extends PickType(
  User,
  ['email', 'password', 'role'],
  ArgsType,
) {}

@ObjectType()
export class CreateUserOutputDto {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
