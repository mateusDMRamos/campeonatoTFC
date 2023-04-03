import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import Team from './TeamsModel';

export default class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  homeTeamId: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  modelName: 'matches',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

MatchesModel.belongsTo(Team, {
  as: 'homeTeam',
  foreignKey: 'homeTeamId',
});

MatchesModel.belongsTo(Team, {
  as: 'awayTeam',
  foreignKey: 'awayTeamId',
});
