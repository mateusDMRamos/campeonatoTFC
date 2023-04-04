import { NextFunction, Response } from 'express';
import { ModelStatic } from 'sequelize';
import NewMatchReq from '../interfaces/NewMatchReq';
import Team from '../models/TeamsModel';

export default class TeamValidation {
  constructor(private model:ModelStatic<Team>) {}

  private async getTeam(id: number) {
    const team = await this.model.findOne({
      where: { id },
      attributes: ['id'],
    });
    return team?.dataValues.id;
  }

  private async validateTeams(homeTeamId: string, awayTeamId: string): Promise<boolean> {
    const homeTeamVerify = await this.getTeam(Number(homeTeamId));
    const awayTeamVerify = await this.getTeam(Number(awayTeamId));
    return homeTeamVerify && awayTeamVerify;
  }

  async verifyTeam(req: NewMatchReq, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const verifiedTeams = await this.validateTeams(homeTeamId, awayTeamId);
    if (!verifiedTeams) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return next();
  }
}
