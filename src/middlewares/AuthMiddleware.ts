import { Response, NextFunction } from 'express';
import { AuthRequest } from 'interfaces/AuthRequest';
import AuthHelper from '../helpers/AuthHelper';
import GenericError from '../helpers/GenericError';
import UserQuery from '../queries/UserQuery';

export default class AuthMiddleware {
  static authUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.cookies;
      if (!token) throw new GenericError('Unauthenticated', 401);

      const { id } = await AuthHelper.verifyToken(token);
      if (!id) throw new GenericError('Unauthenticated', 401);

      const user = await UserQuery.getUser({
        filter: { id },
        attributes: ['id', 'username', 'email', 'password', 'role']
      });

      if (!user) throw new GenericError('Internal Server Error', 500);

      res.locals.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      next();
    } catch (error) {
      next(error);
    }
  };

  static authorizeAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals?.user;

      if (user && user.role == 'admin') {
        next();
      } else {
        throw new GenericError('UnAuthorized', 403);
      }
    } catch (error) {
      next(error);
    }
  };

  static authorizeStock = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals?.user;

      if (user && (user.role == 'admin' || user.role == 'stock')) {
        next();
      } else {
        throw new GenericError('UnAuthorized', 403);
      }
    } catch (error) {
      next(error);
    }
  };

  static authorizeTransactions = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals?.user;

      if (user && (user.role == 'admin' || user.role == 'transactions')) {
        next();
      } else {
        throw new GenericError('UnAuthorized', 403);
      }
    } catch (error) {
      next(error);
    }
  };
}
