import { ModelStatic } from 'sequelize';
import IMatches from '../interfaces/IMatches';
import NewMatchReq from '../interfaces/NewMatchReq';
import MatchesModel from '../models/MatchesModel';
import Team from '../models/TeamsModel';

export default class MatchesService {
  constructor(private model:ModelStatic<MatchesModel>) {}

  public async getAllMatches(): Promise<IMatches[]> {
    const rows = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return rows as IMatches[];
  }

  public async getFiltered(inProgress: string): Promise<IMatches[]> {
    const inProgressBool = inProgress === 'true';
    const rows = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress: inProgressBool },
    });
    return rows as IMatches[];
  }

  public async finishMatch(id: number) {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async setMatch(matchDetails: NewMatchReq): Promise<MatchesModel> {
    const {
      homeTeamGoals,
      awayTeamGoals,
      homeTeamId,
      awayTeamId } = matchDetails;
    const newMatch = await this.model.create(
      { homeTeamGoals,
        awayTeamGoals,
        homeTeamId,
        awayTeamId,
        inProgress: true,
      },
    );
    return newMatch.dataValues;
  }
}
