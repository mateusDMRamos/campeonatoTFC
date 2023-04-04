import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  private service: LeaderBoardService;
  constructor(service: LeaderBoardService) {
    this.service = service;
  }

  async getLeaderBoard(_req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.service.getAllMatches();
    return res.status(200).json(leaderBoard);
  }
}
