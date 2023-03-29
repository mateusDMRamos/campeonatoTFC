import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  private service: TeamsService;
  constructor(service: TeamsService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this.service.getAllTeams();
    return res.status(200).json(teams);
  }
}
