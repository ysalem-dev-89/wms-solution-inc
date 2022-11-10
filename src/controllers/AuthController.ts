import { Response, NextFunction } from 'express';
import { LoginControllerRequest } from '../interfaces/AuthInterface';
import UserQuery from '../queries/UserQuery';
import authSchema from '../validation/userValidation';
import AuthHelper from '../helpers/AuthHelper';
import { validator } from '../validation/validator';
import GenericError from '../helpers/GenericError';

export default class AuthController {
  static login = async (
    req: LoginControllerRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, username } = req.body;
      // const { error } = await validator({ schema: authSchema, data: req.body });
      // if (error) throw new GenericError(error, 400);

      const user = await UserQuery.getUser({
        filter: { username },
        attributes: [
          'id',
          'username',
          'email',
          'password',
          'role',
          'createdAt',
          'updatedAt'
        ]
      });
      console.log('========', user);
      if (!user) throw new GenericError('Invalid credentials', 400);
      const correctPassword = await AuthHelper.checkPassword(
        password,
        user.password
      );
      if (!correctPassword) throw new GenericError('Invalid credentials', 400);

      const token = await AuthHelper.generateToken(user.id.toString());

      res
        .status(200)
        .cookie('token', token)
        .json({
          statusCode: 200,
          message: 'success',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
    } catch (error: unknown) {
      const exception = error as GenericError;
      next(exception);
    }
  };

  static authenticateWithToken = async (
    req: LoginControllerRequest,
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

      res.status(200).json({
        statusCode: 200,
        message: 'success',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
