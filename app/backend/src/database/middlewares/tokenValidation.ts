import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';
import IRequest from '../interfaces/IRequest';
import { IDecoded } from '../interfaces/loginInterface';
import UserModel from '../models/UserModel';

export default class TokenValidation {
  private secret = process.env.JWT_SECRET || 'jwt_secret';
  private configJwt: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

  constructor(private model:ModelStatic<UserModel>) {}

  private async getUser(email: string) {
    const user = await this.model.findOne({
      where: { email },
      attributes: ['email'],
    });
    return user?.dataValues.email;
  }

  async verifyToken(req: IRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
      const decoded = jwt.verify(token, this.secret) as IDecoded;
      const user = await this.getUser(decoded.data.email);
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
      req.email = user;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  }

  signLogin(email: string): string {
    return jwt.sign({ data: { email } }, this.secret, this.configJwt);
  }
}
