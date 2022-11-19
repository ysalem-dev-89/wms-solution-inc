import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', AuthMiddleware.authorizeAdmin, UserController.getUsers);
router.post(
  '/',
  AuthMiddleware.authorizeSuperAdmin,
  UserController.createNewUser
);
router.put('/:id', AuthMiddleware.authorizeAdmin, UserController.updateOneUser);
router.delete(
  '/:id',
  AuthMiddleware.authorizeSuperAdmin,
  UserController.deleteOneUser
);

export default router;
