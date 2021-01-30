import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

export class GraphQLModuleOptions implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    };
  }
}
