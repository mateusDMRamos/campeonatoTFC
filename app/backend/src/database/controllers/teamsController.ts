import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  private service: TeamsService;
  constructor(service: TeamsService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const teams = await this.service.getAllTeams();
    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this.service.getById(Number(id));
    res.status(200).json(team);
  }
}
