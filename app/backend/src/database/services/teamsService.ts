import { ModelStatic } from 'sequelize';
import teamInterface from '../interfaces/teamInterface';
import Team from '../models/TeamsModel';

export default class TeamsService {
  constructor(private model:ModelStatic<Team>) {}

  public async getAllTeams(): Promise<teamInterface[]> {
    const rows = await this.model.findAll();
    return rows as teamInterface[];
  }

  public async getById(id:number): Promise<teamInterface> {
    const team = await this.model.findByPk(id);
    return team as teamInterface;
  }
}
