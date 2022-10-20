import express from 'express';
import compression from 'compression';
import cors from 'cors';
import environment from './config/environment';
import router from './routes';
import cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
  public env: string;

  constructor() {
    this.app = express();
    this.env = environment.nodeEnv;
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true // access-control-allow-credentials:true
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use('/api/v1/', router);
  }
}

const { app } = new App();

export default app;
