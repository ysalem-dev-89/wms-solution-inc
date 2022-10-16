import express from 'express';
import compression from 'compression';
import cors from 'cors';
import environment from './config/environment';
import UserRouter from './routes/UserRoute';

const app: express.Application = express();
const env = environment.nodeEnv;

// initializeMiddlewares
app.use(compression());
app.use(
  cors({
    origin: environment.client.origin,
    credentials: true // access-control-allow-credentials:true
  })
);
app.use(express.json());
app.use(UserRouter);

export default app;
