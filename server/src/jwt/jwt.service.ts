import { Inject, Injectable } from '@nestjs/common';
import { OPTIONS } from './jwt.constants';
import { JwtOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(@Inject(OPTIONS) private readonly options: JwtOptions) {}
}
