import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const productRouter = Router();

productRouter.put('/products/:id', ProductController.updateProduct);

export default productRouter;
