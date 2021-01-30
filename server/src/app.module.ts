import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './config/configModuleOptions';
import { GraphQLModuleOptions } from './config/graphQLModuleOptions';
import { jwtModuleOptions } from './config/jwtModuleOptions';
import { TypeormModuleOptions } from './config/typeormModuleOptions';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    GraphQLModule.forRootAsync({
      useClass: GraphQLModuleOptions,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormModuleOptions,
    }),
    JwtModule.forRoot(jwtModuleOptions()),
    RestaurantsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
