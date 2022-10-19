import { login } from '../controllers/AuthController';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signin', login);

export default authRouter;
