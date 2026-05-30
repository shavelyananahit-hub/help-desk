// Մոդել՝ Աշխատակից (Employee Model)
import { DataTypes } from 'sequelize';
import sequelizeCors from '../config/database.js';

const Ashkhatakits = sequelizeCors.define('Ashkhatakits', {
  // Նույնականացնող համար
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Անուն
  anun: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Անունը չի կարող դատարկ լինել' },
    },
  },
  // Ազգանուն
  azganun: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Ազգանունը չի կարող դատարկ լինել' },
    },
  },
  // Բաժին (Department)
  bakhum: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  // Պաշտոն (Position)
  pashton: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  // Էլ. հասցե
  elektronerayin_hasce: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: { msg: 'Էլ. հասցեն արդեն գրանցված է' },
    validate: {
      isEmail: { msg: 'Մուտքագրեք վավեր էլ. հասցե' },
    },
  },
  // Հեռախոս
  herakhosahamer: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  // Ակտիվ (Active status)
  aktiv: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  schema: 'helpdesk',
  tableName: 'ashkhatakitsner',
  timestamps: true,
  underscored: true,
});

export default Ashkhatakits;
