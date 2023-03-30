import { NextFunction, Request, Response } from 'express';

const verifyEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(regex)) return true;
  return false;
};

const verifyPassword = (password: string): boolean => password.length > 5;

export default function verifyLogin(req: Request, res: Response, next: NextFunction) {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }
  const validEmail = verifyEmail(email);
  const validPassword = verifyPassword(password);
  if (!validEmail || !validPassword) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }
  return next();
}
