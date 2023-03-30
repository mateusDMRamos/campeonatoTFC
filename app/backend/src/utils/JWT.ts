import * as Jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const configJwt: Jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

export default function signLogin(email: string): string {
  return Jwt.sign({ data: { email } }, secret, configJwt);
}
