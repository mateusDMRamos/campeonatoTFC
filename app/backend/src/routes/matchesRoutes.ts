import { Request, Response, NextFunction, Router } from 'express';
import MatchesService from '../database/services/matchService';
import MatchesModel from '../database/models/MatchesModel';
import MatchesController from '../database/controllers/matchController';
import TokenValidation from '../database/middlewares/tokenValidation';
import UserModel from '../database/models/UserModel';

const matchesRouter = Router();
const matchesservice = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesservice);
const tokenValidation = new TokenValidation(UserModel);

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.getAll(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => tokenValidation.verifyToken(req, res, next),
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => tokenValidation.verifyToken(req, res, next),
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default matchesRouter;
