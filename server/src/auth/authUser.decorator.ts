import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context).getContext();
  const user = gqlContext['user'];
  return user;
});