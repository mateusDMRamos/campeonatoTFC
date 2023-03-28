import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  modelName: 'teams',
  // underscored: true,
  sequelize: db,
  timestamps: false,
});
