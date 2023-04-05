import { ModelStatic } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatches from '../interfaces/IMatches';
import MatchesModel from '../models/MatchesModel';
import Team from '../models/TeamsModel';

export default class LeaderBoardService {
  private homeTeams = [] as ILeaderboard[];
  private dataTemplate = {
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  constructor(private model:ModelStatic<MatchesModel>) {}

  private async getAllMatches(): Promise<IMatches[]> {
    const rows = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return rows as IMatches[];
  }

  private setTeamData(teamData: IMatches[], name: string) {
    const teamStat = { totalGames: teamData.length } as ILeaderboard;
    teamStat.totalVictories = teamData
      .filter((match) => match.dataValues.homeTeamGoals > match.dataValues.awayTeamGoals)
      .length;
    teamStat.totalLosses = teamData
      .filter((match) => match.dataValues.homeTeamGoals < match.dataValues.awayTeamGoals)
      .length;
    teamStat.totalDraws = teamData
      .filter((match) => match.dataValues.homeTeamGoals === match.dataValues.awayTeamGoals)
      .length;
    teamStat.totalPoints = teamStat.totalVictories * 3 + teamStat.totalDraws;
    teamStat.goalsFavor = teamData.reduce((acc, cur) => cur.dataValues.homeTeamGoals + acc, 0);
    teamStat.goalsOwn = teamData.reduce((acc, cur) => cur.dataValues.awayTeamGoals + acc, 0);
    teamStat.name = name;
    teamStat.goalsBalance = teamStat.goalsFavor - teamStat.goalsOwn;
    teamStat.efficiency = ((teamStat.totalPoints * 100) / (teamData.length * 3)).toFixed(2);
    this.homeTeams.push(teamStat);
  }

  private orderLeaderBoard() {
    this.homeTeams.sort((a, b) => {
      if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
      if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }

  private setLeaderBoard(matches: IMatches[], homeTeams: string[]) {
    homeTeams.forEach((team) => {
      const teamMatches = matches
        .filter((match) => match.dataValues.homeTeam.teamName === team);
      this.setTeamData(teamMatches, team);
    });
    this.orderLeaderBoard();
  }

  public async getHomeLeaderBoard():Promise<ILeaderboard[]> {
    this.homeTeams = [];
    const matches = await this.getAllMatches();
    const homeTeams = matches.map((match) => match.dataValues.homeTeam.teamName);
    const uniqueHomeTeams = homeTeams.filter((team, index, array) => (array
      .indexOf(team) === index));
    this.setLeaderBoard(matches, uniqueHomeTeams);
    return this.homeTeams;
  }
}
