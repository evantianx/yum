import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseResponseDto {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
