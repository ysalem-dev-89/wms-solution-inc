import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

router.put('/:id', ProductController.updateProduct);

export default router;
