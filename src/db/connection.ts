import { Sequelize } from 'sequelize';
import environment from '../config/environment';

const dbUri = environment.database.uri;
const ssl = environment.ssl;
const connection = new Sequelize(`${dbUri}`, {
  dialectOptions: { ssl },
  logging: true
});

export const sequelize = connection; // connection instance (RAW queries)
