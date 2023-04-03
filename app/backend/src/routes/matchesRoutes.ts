import { Request, Response, Router } from 'express';
import MatchesService from '../database/services/matchService';
import MatchesModel from '../database/models/MatchesModel';
import MatchesController from '../database/controllers/matchController';

const matchesRouter = Router();
const matchesservice = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesservice);

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.getAll(req, res),
);

export default matchesRouter;
