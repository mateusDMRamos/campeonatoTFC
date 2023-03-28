import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class TeamModel extends Model {}

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
  underscored: true,
  sequelize: db,
  timestamps: false,
});
