// Մոդել՝ Ծանուցում (Notification Model)
import { DataTypes } from 'sequelize';
import sequelizeCors from '../config/database.js';

const Tsanusatsurn = sequelizeCors.define('Tsanusatsurn', {
  // Նույնականացնող համար
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Հաղորդագրություն (Message)
  haghordagutyun: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Հաղորդագրությունը չի կարող դատարկ լինել' },
    },
  },
  // Կարդացված (Read status)
  kardatsvatsd: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Ծանուցման տեսակ (Notification type)
  tesak: {
    type: DataTypes.ENUM('Տեղեկություն', 'Զգուշացում', 'Սխալ', 'Հաջողություն'),
    defaultValue: 'Տեղեկություն',
    allowNull: false,
  },
  // Ստացողի ID (Recipient user ID)
  ogtater_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ogtaterner',
      key: 'id',
    },
  },
  // Կապված Ticket ID (Related ticket)
  tiket_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tiketer',
      key: 'id',
    },
  },
}, {
  schema: 'helpdesk',
  tableName: 'tsanusatsurnner',
  timestamps: true,
  underscored: true,
});

export default Tsanusatsurn;
