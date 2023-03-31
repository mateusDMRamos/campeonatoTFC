import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { LoginBody, ITokenResponse } from '../interfaces/loginInterface';
import UserModel from '../models/UserModel';
import TokenValidation from '../middlewares/tokenValidation';

export default class LoginService {
  constructor(
    private model:ModelStatic<UserModel>,
    private tokenValidation = new TokenValidation(UserModel),
  ) {}

  public async login(login: LoginBody): Promise<ITokenResponse> {
    const user = await this.model.findOne({
      where: { email: login.email },
    });
    if (!user) return { validated: false };
    const validated = bcrypt.compareSync(login.password, user?.dataValues.password);
    const token = this.tokenValidation.signLogin(user?.dataValues.email);
    return { validated, token };
  }

  public async getRole(email: string) {
    const user = await this.model.findOne({
      where: { email },
      attributes: ['role'],
    });
    return user?.dataValues.role;
  }
}
