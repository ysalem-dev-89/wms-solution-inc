import express from 'express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import environment from './config/environment';
import router from './routes';
import { join } from 'path';
// import { createServer } from 'http';
// import { Server as WebSocket } from 'socket.io';

class App {
  public app: express.Application;
  public env: string;
  // public io: any;
  // public httpServer: any;

  constructor() {
    this.app = express();
    // this.httpServer = createServer(this.app);
    // this.io = new WebSocket(this.httpServer, {});
    this.env = environment.nodeEnv;
    this.initializeMiddlewares();
    // this.io.on('connection', () => {
    //   console.log('SOCKET ESTABLISHED');
    // });
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(
      cors({
        origin: environment.client.origin,
        credentials: true // access-control-allow-credentials:true
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use('/api/v1/', router);
    if (environment.nodeEnv === 'production') {
      this.app.use(express.static(join(__dirname, '..', 'client', 'build')));
      this.app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
      });
    }
  }
}

const { app } = new App();

export default app;
