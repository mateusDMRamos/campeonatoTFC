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
}
