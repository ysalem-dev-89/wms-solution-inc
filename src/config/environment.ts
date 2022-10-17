/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
const { DATABASE_URL, PORT, NODE_ENV } = process.env;
=======
const { DATABASE_URL, PORT, NODE_ENV, ORIGIN } = process.env;
>>>>>>> react-router-and-layout

const config = {
  database: {
    uri: DATABASE_URL
  },
  port: PORT || 3000,
<<<<<<< HEAD
  nodeEnv: NODE_ENV || 'development'
=======
  nodeEnv: NODE_ENV || 'development',
  client: {
    origin: ORIGIN || 'http://localhost:3000'
  }
>>>>>>> react-router-and-layout
};

export default config;
