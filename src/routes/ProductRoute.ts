import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ProductController from '../controllers/ProductController';

const router = Router();

router.get('/', ProductController.getProducts);
router;
router.get('/search/', ProductController.getProductsByTitle);
router.get('/:id', ProductController.getOneProduct);

router
  .route('/:id')
  .put(AuthMiddleware.authorizeStock, ProductController.updateProduct)
  .delete(AuthMiddleware.authorizeStock, ProductController.deleteProduct);

export default router;
