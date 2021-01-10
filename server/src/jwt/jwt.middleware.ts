import { NextFunction, Request, Response } from 'express';

// export class JwtMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(req.headers);
//     next();
//   }
// }

export const JwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.headers);
  next();
};
