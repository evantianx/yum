import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { OPTIONS } from './jwt.constants';
import { JwtOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(@Inject(OPTIONS) private readonly options: JwtOptions) {}

  sign(id: number): string {
    return jwt.sign({ id }, this.options.privateKey);
  }
}
