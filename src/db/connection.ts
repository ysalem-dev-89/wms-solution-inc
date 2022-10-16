import { Sequelize } from 'sequelize'
import environment from '../config/environment'

const dbUri = environment.database.uri
const connection = new Sequelize(
  `${dbUri}${
    environment.nodeEnv === 'production'
      ? '?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory' // TODO: fix ssl config
      : ''
  }`,
  {
    logging: console.log
  }
)

export const sequelize = connection // connection instance (RAW queries)
