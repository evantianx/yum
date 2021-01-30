import { JwtOptions } from '../jwt/jwt.interfaces';

export const jwtModuleOptions = (): JwtOptions => ({
  privateKey: process.env.JWT_TOKEN_SECRET,
});
