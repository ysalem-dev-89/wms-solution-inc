import { Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import GenericError from '../helpers/GenericError';
import { CategoryRequest } from '../interfaces/CategoryRequest';
import CategoryQuery from '../queries/CategoryQuery';

export default class CategoryController {
  static createNewCategory = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;

      const category = await CategoryQuery.createNewCategory(name);

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

  static updateOneCategory = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await CategoryQuery.updateOneCategory({
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

  static deleteOneCategory = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await CategoryQuery.deleteOneCategory(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static getCategories = async (
    req: CategoryRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name = '', offset = '0', limit = '20' } = req.query;
      const categories = await CategoryQuery.getCategories({
        name,
        limit: Number(limit),
        offset: Number(offset)
      });

      res.json({
        status: 200,
        message: 'Success',
        totalCount: categories.count.length,
        items: categories.rows
      });
    } catch (error) {
      next(error);
    }
  };
}
