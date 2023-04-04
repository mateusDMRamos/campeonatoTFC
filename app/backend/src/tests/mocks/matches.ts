import IMatches from '../../database/interfaces/IMatches';
import NewMatchReq from '../../database/interfaces/NewMatchReq';
import MatchesModel from '../../database/models/MatchesModel';

const matchesData = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
] as IMatches[];

const goalsReqBody = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

const newMatch = {
  dataValues: {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
  } 
} as MatchesModel;

const newMatchReq = {
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
} as NewMatchReq

export {
  goalsReqBody,
  newMatch,
  newMatchReq,
}

export default matchesData;