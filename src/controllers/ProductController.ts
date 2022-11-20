import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import GenericError from '../helpers/GenericError';
import ProductQuery from '../queries/ProductQuery';
import { ProductRequest } from '../interfaces/ProductRequest';
export default class ProductController {
  static updateProduct = async (
    req: ProductRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { barcode, title, description, icon, price, discount, unit } =
        req.body;

      const updatedProducts = await ProductQuery.update({
        id: Number(id),
        barcode,
        title,
        description,
        icon,
        price,
        discount,
        unit
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

  static getProducts = async (
    req: ProductRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        id = -1,
        barcode = '',
        title = '',
        categoryId = '',
        limit = 1000,
        offset = 0
      } = req.query;

      const products = await ProductQuery.getProducts({
        id: Number(id),
        barcode,
        title,
        categoryId,
        limit: Number(limit),
        offset: Number(offset)
      });

      const totalCount = await sequelize.query(
        `SELECT COUNT(*) FROM "Products"`,
        {
          type: QueryTypes.SELECT
        }
      );
      res.json({ products, totalCount });
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  static deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await ProductQuery.deleteProduct(Number(id));
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
  static getOneProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const product = await ProductQuery.getOneProduct({
        id: Number(id)
      });

      res.json({
        status: 200,
        message: 'Success',
        product: product
      });
    } catch (error) {
      next(error);
    }
  };

  static getProductsByTitle = async (
    req: ProductRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title = '' } = req.query;
      const products = await ProductQuery.getProductsByTitle({
        title
      });

      res.json({
        status: 200,
        message: 'Success',
        totalCount: products.length,
        items: products
      });
    } catch (error) {
      next(error);
    }
  };
}
