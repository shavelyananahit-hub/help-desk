import { DataTypes } from 'sequelize';
import sequelizeCors from '../config/database.js';

const Statistic = sequelizeCors.define('Statistic', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true,
  },
  tickets_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  users_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  employees_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  schema: 'helpdesk',
  tableName: 'statistics',
  timestamps: true,
  underscored: true,
});

export default Statistic;
