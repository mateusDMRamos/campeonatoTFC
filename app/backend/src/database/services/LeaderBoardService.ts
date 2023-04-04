import { ModelStatic } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatches from '../interfaces/IMatches';
import MatchesModel from '../models/MatchesModel';
import Team from '../models/TeamsModel';

export default class LeaderBoardService {
  private homeTeams = [] as ILeaderboard[];
  constructor(private model:ModelStatic<MatchesModel>) {}

  private async getAllMatches(): Promise<IMatches[]> {
    const rows = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return rows as IMatches[];
  }

  private setTeamData(teamMatches: IMatches[], { name }: ILeaderboard) {
    const teamData = { totalGames: teamMatches.length } as ILeaderboard;
    teamData.totalVictories = teamMatches
      .filter((match) => match.dataValues.homeTeamGoals > match.dataValues.awayTeamGoals)
      .length;
    teamData.totalLosses = teamMatches
      .filter((match) => match.dataValues.homeTeamGoals < match.dataValues.awayTeamGoals)
      .length;
    teamData.totalDraws = teamMatches
      .filter((match) => match.dataValues.homeTeamGoals === match.dataValues.awayTeamGoals)
      .length;
    teamData.totalPoints = teamData.totalVictories * 3 + teamData.totalDraws;
    teamData.goalsFavor = teamMatches.reduce((acc, cur) => cur.dataValues.homeTeamGoals + acc, 0);
    teamData.goalsOwn = teamMatches.reduce((acc, cur) => cur.dataValues.awayTeamGoals + acc, 0);
    teamData.name = name;
    this.homeTeams.push(teamData);
  }

  private async setLeaderBoard(matches: IMatches[], homeTeams: ILeaderboard[]) {
    homeTeams.forEach((team) => {
      const teamMatches = matches
        .filter((match) => match.dataValues.homeTeam.teamName === team.name);
      this.setTeamData(teamMatches, team);
    });
  }

  public async getHomeLeaderBoard():Promise<ILeaderboard[]> {
    this.homeTeams = [];
    const matches = await this.getAllMatches();
    const homeTeams = matches.map((match) => ({ name: match.dataValues.homeTeam.teamName }));
    this.setLeaderBoard(matches, homeTeams);
    return this.homeTeams;
  }
}
