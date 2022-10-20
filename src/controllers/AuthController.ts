import { Request, Response, NextFunction } from 'express';
import { UserQuery } from '../queries/UserQuery';
import authSchema from '../validation/userValidation';
import { AuthHelper } from '../helpers/AuthHelper';
import { validator } from '../validation/validator';
import GenericError from '../helpers/GenericError';

const userQuery = new UserQuery();
const authHelper = new AuthHelper();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const { error } = await validator({ schema: authSchema, data: req.body });

    if (error) throw new GenericError(error, 400);

    const user = await userQuery.getUser({
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

    if (!user) throw new GenericError('Invalid credentials', 400);

    const correctPassword = await authHelper.checkPassword(
      password,
      user.password
    );

    if (!correctPassword) throw new GenericError('Invalid credentials', 400);

    const token = await authHelper.generateToken(user.id.toString());

    res
      .status(200)
      .cookie('token', token)
      .json({
        status: 200,
        message: 'Success',
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
