import AuthController from '../controllers/AuthController';
import { Router } from 'express';

const router = Router();

router.post('/login', AuthController.login);
router.post('/token', AuthController.authenticateWithToken);
router.get('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({
    message: 'success'
  });
});

export default router;
