import { DynamicModule, Global, Module } from '@nestjs/common';
import { OPTIONS } from './jwt.constants';
import { JwtOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [{ provide: OPTIONS, useValue: options }, JwtService],
    };
  }
}
