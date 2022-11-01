import http from 'http';
import app from './app';
import { sequelize as dbConnection } from './db/connection';
import environment from './config/environment';

const port = environment.port;

const server = http.createServer(app);

dbConnection
  .sync(/*{ force: environment.nodeEnv === 'development' }*/) // TODO: remove it and update the populate db script
  .then(() => {
    server.listen(port, () => console.log(`app is running on prot: ${port}`));
  })
  .catch(console.log);
