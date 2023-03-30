import { NextFunction, Request, Response } from 'express';

export default class LoginValidation {
  // eslint-disable-next-line class-methods-use-this
  public verifyLogin(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    return next();
  }
}
