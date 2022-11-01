import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

router.get('/', ProductController.getProducts);
router;
router.get('/search/', ProductController.getProductsByTitle);
router
  .route('/:id')
  .get(ProductController.getOneProduct)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

export default router;
