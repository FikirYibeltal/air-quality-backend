import { Sequelize } from 'sequelize';
import config from '../../config';
const sequelize = new Sequelize({
  database: config.pgDatabase,
  username: config.pgUsername,
  password: config.pgPassword,
  host: config.pgHost,
  port: parseInt(config.pgPort as any),
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
