import MatchesModel from '../models/MatchesModel';

export default interface IMatches extends MatchesModel {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}
