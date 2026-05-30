// Մոդել՝ Տիկետ (Ticket Model)
import { DataTypes } from 'sequelize';
import sequelizeCors from '../config/database.js';

const Tiket = sequelizeCors.define('Tiket', {
  // Նույնականացնող համար
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Վերնագիր
  vernagir: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Վերնագիրը չի կարող դատարկ լինել' },
    },
  },
  // Նկարագրություն
  nkaragrutyun: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Կարգնիշ (Priority)
  kargnish: {
    type: DataTypes.ENUM('Ցածր', 'Միջին', 'Բարձր'),
    defaultValue: 'Միջին',
    allowNull: false,
  },
  // Կարգավիճակ (Status)
  kargavichak: {
    type: DataTypes.ENUM('Բաց', 'Ընթացիկ', 'Փակված'),
    defaultValue: 'Բաց',
    allowNull: false,
  },
  // Կատեգորիա (Category)
  kategoria: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  // Ստեղծողի ID (Creator user ID)
  ogtater_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ogtaterner',
      key: 'id',
    },
  },
  // Հանձնված աշխատակցի ID (Assigned employee ID)
  ashkhatakits_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ashkhatakitsner',
      key: 'id',
    },
  },
}, {
  schema: 'helpdesk',
  tableName: 'tiketer',
  timestamps: true,
  underscored: true,
});

export default Tiket;
