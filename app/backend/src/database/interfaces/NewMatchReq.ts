import { Request } from 'express';

export default interface NewMatchReq extends Request {
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  homeTeamId?: number,
  awayTeamId?: number,
}
