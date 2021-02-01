import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { JwtService } from './jwt.service';

// Functional middleware
// export const JwtMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.log(req.headers);
//   next();
// };

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const auth = req?.headers?.authorization;
    if (!auth) return next();
    if (auth?.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];
    try {
      const { id }: any = this.jwt.verify(token);
      if (id) {
        req['user'] = await this.usersService.findById(id);
      }
    } catch (err) {
      const message = `Token error: ${err.message || err.name}`;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
    next();
  }
}
