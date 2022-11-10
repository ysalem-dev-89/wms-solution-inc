/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL, PORT, NODE_ENV, SECRET_KEY, ORIGIN } = process.env;
const config = {
  database: {
    uri: DATABASE_URL
  },
  port: PORT || 4000,
  nodeEnv: NODE_ENV || 'development',
  jwt: {
    secretKey: SECRET_KEY || ''
  },
  client: {
    origin: ORIGIN || 'http://localhost:3000'
  },
  ssl: false
};

export default config;
