import { Request, Response } from 'express';
import MatchesService from '../services/matchService';

export default class MatchesController {
  private service: MatchesService;
  constructor(service: MatchesService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.service.getFiltered(inProgress as string);
      return res.status(200).json(matches);
    }
    const matches = await this.service.getAllMatches();
    return res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { homeTeamGoals, awayGoals } = req.body;
    const { id } = req.params;
    await this.service.updateMatch(Number(id), Number(homeTeamGoals), Number(awayGoals));
    res.status(200).json({ message: 'Match updated' });
  }
}
