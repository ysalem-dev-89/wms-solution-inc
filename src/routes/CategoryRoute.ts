import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.post('/', CategoryController.createNewCategory);
router.put('/:id', CategoryController.updateOneCategory);
router.delete('/:id', CategoryController.deleteOneCategory);
router.get('/', CategoryController.getCategories);

export default router;
