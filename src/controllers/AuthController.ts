import { Request, Response } from 'express';
import { UserQuery } from '../queries/UserQuery';
import authSchema from '../validation/userValidation';
import { AuthHelper } from '../helpers/AuthHelper';
import { validator } from '../validation/validator';

export const login = async (req: Request, res: Response) => {
  const authHelper = new AuthHelper();

  const { password, username } = req.body;

  const userQuery = new UserQuery();

  try {
    const { error } = await validator({ schema: authSchema, data: req.body });

    if (error) throw new Error(error);

    const user = await userQuery.getUser({
      filter: { username },
      attributes: ['id', 'username', 'email', 'createdAt', 'password']
    });

    if (!user) throw new Error('Invalid credentials');

    const correctPassword = await authHelper.checkPassword(
      password,
      user.password
    );

    if (!correctPassword) throw new Error('Invalid credentials');

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
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        statusCode: 400,
        error: error.message
      });
    } else {
      res.json({
        statusCode: 400,
        error: error
      });
    }
  }
};
