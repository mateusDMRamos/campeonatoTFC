import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private service: LoginService;
  constructor(service: LoginService) {
    this.service = service;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { validated, token } = await this.service.login(req.body);
    if (validated) return res.status(200).json(token);
    return res.status(400).json({ message: 'Invalid email or password' });
  }
}
