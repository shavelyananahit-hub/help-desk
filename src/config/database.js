// Տվյալների բազայի կապ (Database connection)
import { Sequelize } from 'sequelize';

const ogtahostname = process.env.DB_HOST || 'localhost';
const nakavayrPort = parseInt(process.env.DB_PORT || '5432');
const bazayiAnun = process.env.DB_NAME || 'helpdesk';
const ogtahordoghAnun = process.env.DB_USER || 'postgres';
const gtnayin_bard = process.env.DB_PASSWORD || 'postgres';

const sequelizeCors = new Sequelize(bazayiAnun, ogtahordoghAnun, gtnayin_bard, {
  host: ogtahostname,
  port: nakavayrPort,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelizeCors;
