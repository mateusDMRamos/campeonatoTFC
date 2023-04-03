import { ModelStatic } from 'sequelize';
import IMatches from '../interfaces/IMatches';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(private model:ModelStatic<MatchesModel>) {}

  public async getAllMatches(): Promise<IMatches[]> {
    const rows = await this.model.findAll();
    return rows as IMatches[];
  }
}
