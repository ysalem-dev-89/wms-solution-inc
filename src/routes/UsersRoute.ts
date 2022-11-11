import UserController from '../controllers/UserController';
import { Router } from 'express';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createNewUser);
router.put('/:id', UserController.updateOneUser);
router.delete('/:id', UserController.deleteOneUser);

export default router;
