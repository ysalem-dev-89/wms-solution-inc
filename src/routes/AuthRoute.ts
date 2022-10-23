import AuthController from '../controllers/AuthController';
import { Router } from 'express';

const router = Router();

router.post('/login', AuthController.login);
router.post('/token', AuthController.authenticateWithToken);

export default router;
