import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.post(
  '/',
  AuthMiddleware.authorizeStock,
  CategoryController.createNewCategory
);
router.put(
  '/:id',
  AuthMiddleware.authorizeStock,
  CategoryController.updateOneCategory
);
router.delete(
  '/:id',
  AuthMiddleware.authorizeStock,
  CategoryController.deleteOneCategory
);
router.get('/', CategoryController.getCategories);

export default router;
