import { NextFunction, Request, Response, Router } from 'express';
import GenericError from '../helpers/GenericError';
import authRouter from './AuthRoute';
import productRouter from './ProductRoute';
import categoryRouter from './CategoryRoute';
import analyticsRouter from './analyticsRoute';
import transactionRouter from './TransactionRoute';
import userRouter from './UsersRoute';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', AuthMiddleware.authUser, productRouter);
router.use('/categories', AuthMiddleware.authUser, categoryRouter);
router.use('/analytics', AuthMiddleware.authUser, analyticsRouter);
router.use(
  '/transactions',
  AuthMiddleware.authUser,
  AuthMiddleware.authorizeTransactions,
  transactionRouter
);
router.use(
  '/users',
  AuthMiddleware.authUser,
  AuthMiddleware.authorizeAdmin,
  userRouter
);

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
