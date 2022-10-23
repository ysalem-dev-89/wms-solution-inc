import AuthController from '../controllers/AuthController';
import { Router } from 'express';

const router = Router();

router.post('/login', AuthController.login);
router.post('/check-login', AuthController.checkLogin);

export default router;
