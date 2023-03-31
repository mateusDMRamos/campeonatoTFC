import { NextFunction, Request, Response, Router } from 'express';
import LoginService from '../database/services/loginService';
import UserModel from '../database/models/UserModel';
import LoginController from '../database/controllers/loginController';
import verifyLogin from '../database/middlewares/loginValidation';
import TokenValidation from '../database/middlewares/tokenValidation';

const userRouter = Router();
const userservice = new LoginService(UserModel);
const userController = new LoginController(userservice);
const tokenValidation = new TokenValidation(UserModel);

userRouter.post(
  '/',
  verifyLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRouter.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => tokenValidation.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.sendRole(req, res),
);

export default userRouter;
