import { ModelStatic } from 'sequelize';
import IMatches from '../interfaces/IMatches';
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
}
