import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormModuleOptions implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_DB'),
      synchronize: this.configService.get('TYPEORM_SYNCHRONIZE') || false,
      dropSchema: this.configService.get('TYPEORM_DROPSCHEMA') || false,
      logging: this.configService.get('TYPEORM_LOGGING'),
      autoLoadEntities: true,
    };
  }
}
