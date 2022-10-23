import { Request, Response, NextFunction } from 'express';
import GenericError from '../helpers/GenericError';
import ProductQuery from 'queries/ProductQuery';

export default class ProductController {
  static updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id: number = parseInt(req.params.id as string);
    const { title, description, icon, price, discount } = req.body;

    try {
      const updatedProducts = await ProductQuery.update({
        id,
        title,
        description,
        icon,
        price,
        discount
      });

      if (!updatedProducts) throw new GenericError('Product is not found', 400);

      res.json({
        status: 200,
        message: 'Success',
        product: updatedProducts[1]
      });
    } catch (error) {
      next(error);
    }
  };
}
