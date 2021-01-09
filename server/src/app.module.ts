import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { validationSchema } from './config/envValidationSchema';
import { JwtModule } from './jwt/jwt.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.JWT_TOKEN_SECRET,
    }),
    RestaurantsModule,
    UsersModule,
    BaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
