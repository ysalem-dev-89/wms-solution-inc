import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.put('/:id', ProductController.updateProduct);

export default router;

