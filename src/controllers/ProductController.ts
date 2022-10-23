import { Response, NextFunction } from 'express';
import GenericError from '../helpers/GenericError';
import ProductQuery from 'queries/ProductQuery';
import { ProductRequest } from 'interfaces/ProductRequest';
export default class ProductController {
  static updateProduct = async (
    req: ProductRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { title, description, icon, price, discount } = req.body;

      const updatedProducts = await ProductQuery.update({
        id: Number(id),
        title,
        description,
        icon,
        price,
        discount
      });

      if (!updatedProducts) throw new GenericError('Not Found', 404);

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
