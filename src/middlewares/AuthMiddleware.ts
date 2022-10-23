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
      if (!token) throw new GenericError('Unauthorized', 401);

      const { id }: any = await AuthHelper.verifyToken(token);
      if (!id) throw new GenericError('Unauthorized', 401);

      const user = await UserQuery.getUser({
        filter: { id },
        attributes: ['id', 'username', 'email', 'password', 'role']
      });

      if (!user) throw new GenericError('Internal Server Error', 500);

      req.user = {
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
}
