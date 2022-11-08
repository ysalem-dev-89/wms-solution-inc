import { NextFunction, Request, Response, Router } from 'express';
import GenericError from '../helpers/GenericError';
import authRouter from './AuthRoute';
import userRouter from './UserRoute';
import productRouter from './ProductRoute';
import categoryRouter from './CategoryRoute';
import analyticsRouter from './analyticsRoute';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/analytics', analyticsRouter);

router.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const exception = err as GenericError;
  res.status(exception.status || 500).json({
    statusCode: exception.status || 500,
    error:
      exception.name === 'GenericError'
        ? exception.message
        : 'Internal Server Error'
  });
});

export default router;
