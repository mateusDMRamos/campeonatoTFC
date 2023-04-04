import { FindAttributeOptions, ModelStatic } from 'sequelize';
import * as s from 'sequelize';
import IMatches from '../interfaces/IMatches';
import MatchesModel from '../models/MatchesModel';
import Team from '../models/TeamsModel';

const homeGoals = 'homeTeamGoals';
const awayGoals = 'awayTeamGoals';

export default class LeaderBoardService {
  private attributes = [
    ['teamName', 'name'],
    [s.fn('COUNT', s.col('homeTeamId')), 'totalGames'],
    [s.fn('SUM', s.col(homeGoals)), 'goalsFavor'],
    [s.fn('SUM', s.col(awayGoals)), 'goalsOwn'],
    [s.fn('COUNT', s.col(homeGoals), s.literal('>'), s.col(awayGoals)),
      'totalVictories'],
    [s.fn('COUNT', s.col(homeGoals), s.literal('<'), s.col(awayGoals)),
      'totalLosses'],
    [s.fn('COUNT', s.col(homeGoals), s.literal('='), s.col(awayGoals)),
      'totalDraws'],
    [s.fn('SUM', s.col('totalVictories'), s.literal(' * 3 + '), s.col(awayGoals)),
      'totalPoints'],
  ] as FindAttributeOptions;

  constructor(private model:ModelStatic<MatchesModel>) {}

  public async getAllMatches(): Promise<IMatches[]> {
    const rows = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      ],
      attributes: this.attributes,
      group: 'name',
    });
    return rows as IMatches[];
  }
}
