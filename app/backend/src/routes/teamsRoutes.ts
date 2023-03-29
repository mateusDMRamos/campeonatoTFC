import { Request, Response, Router } from 'express';
import Team from '../database/models/TeamsModel';
import TeamsService from '../database/services/teamsService';
import TeamsController from '../database/controllers/teamsController';

const teamsRouter = Router();
const teamService = new TeamsService(Team);
const teamsController = new TeamsController(teamService);

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default teamsRouter;
