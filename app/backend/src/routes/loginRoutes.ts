import { NextFunction, Request, Response, Router } from 'express';
import LoginService from '../database/services/loginService';
import UserModel from '../database/models/UserModel';
import LoginController from '../database/controllers/loginController';
import LoginValidation from '../database/middlewares/loginValidation';

const userRouter = Router();
const userservice = new LoginService(UserModel);
const userController = new LoginController(userservice);
const loginValodation = new LoginValidation();

userRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => loginValodation.verifyLogin(req, res, next),
  (req: Request, res: Response) => userController.login(req, res),
);

export default userRouter;
