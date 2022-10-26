import { Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import GenericError from '../helpers/GenericError';
import { CategoryRequest } from '../interfaces/CategoryRequest';
import CategoryQuery from '../queries/CategoryQuery';

export default class CategoryController {
  static create = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;

      const category = await CategoryQuery.create(name);

      res.json({
        status: 201,
        message: 'Success',
        category: category
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception?.errors[0]?.message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static update = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await CategoryQuery.update({
        id: Number(id),
        name
      });

      if (!category) throw new GenericError('Not Found', 404);

      res.json({
        status: 200,
        message: 'Success',
        category: category[1]
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception?.errors[0]?.message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static delete = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await CategoryQuery.delete(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static search = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name = '', offset = '0', limit = '20' } = req.query;
      const categories = await CategoryQuery.search({
        name,
        limit: Number(limit),
        offset: Number(offset)
      });
      const count = await CategoryQuery.getCount();

      res.json({
        status: 200,
        message: 'Success',
        totalCount: count,
        items: categories
      });
    } catch (error) {
      next(error);
    }
  };
}
