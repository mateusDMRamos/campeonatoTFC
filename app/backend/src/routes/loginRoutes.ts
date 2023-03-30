import { Request, Response, Router } from 'express';
import LoginService from '../database/services/loginService';
import UserModel from '../database/models/UserModel';
import LoginController from '../database/controllers/loginController';

const userRouter = Router();
const userservice = new LoginService(UserModel);
const userController = new LoginController(userservice);

userRouter.post('/', (req: Request, res: Response) => userController.login(req, res));

export default userRouter;
