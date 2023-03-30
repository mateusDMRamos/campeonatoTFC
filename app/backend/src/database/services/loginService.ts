import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import signLogin from '../../utils/JWT';
import { LoginBody, ITokenResponse } from '../interfaces/loginInterface';
import UserModel from '../models/UserModel';

export default class LoginService {
  constructor(private model:ModelStatic<UserModel>) {}

  public async login(login: LoginBody): Promise<ITokenResponse> {
    const user = await this.model.findOne({
      where: { email: login.email },
    });
    if (!user) return { validated: false };
    const validated = bcrypt.compareSync(login.password, user?.dataValues.password);
    const token = signLogin(user?.dataValues.email);
    return { validated, token };
  }
}
