import { Request, Response } from 'express';
import IRequest from '../interfaces/IRequest';
import LoginService from '../services/loginService';

export default class LoginController {
  private service: LoginService;
  constructor(service: LoginService) {
    this.service = service;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { validated, token } = await this.service.login(req.body);
    if (validated) return res.status(200).json({ token });
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  async sendRole(req: IRequest, res: Response) {
    const email = req.email as string;
    const role = await this.service.getRole(email);
    res.status(200).json({ role });
  }
}
