import { createServer } from 'http';
import { Server as WebSocket } from 'socket.io';
import app from './app';
import { sequelize as dbConnection } from './db/connection';
import environment from './config/environment';
import SocketController from './controllers/SocketController';

const { port } = environment;

const httpServer = createServer(app);

const io = new WebSocket(8080, {
  cors: {
    origin: environment.client.origin,
    credentials: true
  }
});

dbConnection
  .sync()
  .then(() => io.on('connection', SocketController.ioHandler(io)))
  .then(() => {
    httpServer.listen(port, () =>
      console.log(`app is running on prot: ${port}`)
    );
  })
  .catch(console.log);
