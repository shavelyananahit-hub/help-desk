// Մոդել՝ Օգտատեր (User Model)
import { DataTypes } from 'sequelize';
import sequelizeCors from '../config/database.js';

const Ogtater = sequelizeCors.define('Ogtater', {
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
  // Դեր
  der: {
    type: DataTypes.ENUM('Ադմինիստրատոր', 'Հաճախորդ', 'Աշխատակից'),
    defaultValue: 'Հաճախորդ',
    allowNull: false,
  },
  // Գաղտնաբառ
  gtnayin_bard: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  schema: 'helpdesk',
  tableName: 'ogtaterner',
  timestamps: true,
  underscored: true,
});

export default Ogtater;
