import { Request, Response, Router } from 'express';
import LeaderBoardController from '../database/controllers/leaderBoardController';
import MatchesModel from '../database/models/MatchesModel';
import LeaderBoardService from '../database/services/LeaderBoardService';

const leaderBoardRouter = Router();
const leaderboardService = new LeaderBoardService(MatchesModel);
const leaderBoardController = new LeaderBoardController(leaderboardService);

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getLeaderBoard(req, res),
);

export default leaderBoardRouter;
