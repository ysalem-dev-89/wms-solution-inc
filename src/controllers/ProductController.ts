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
        barcode = '',
        title = '',
        categoryId = '',
        limit = 1000,
        offset = 0
      } = req.query;
      let filter = categoryId ? '"categoryId" = :categoryId' : '';
      if (barcode) {
        filter += (filter ? ' AND ' : '') + 'barcode like :barcode';
      } else if (title) {
        filter += (filter ? ' AND ' : '') + 'title like :title';
      }

      if (filter) filter = 'where ' + filter;

      const products = await sequelize.query(
        `select p.id,
                p.price,
                p.barcode,
                p.title,
                p.discount,
                p.icon,
                p.description,
                p.unit,
                c.id as categoryId,
                c.name as categoryName,
                coalesce(
                    (
                        (
                            select SUM(tp.quantity)
                            from "TransactionProducts" as tp
                                join "Transactions" as t on t.id = tp."TransactionId"
                            where tp.status = 'closed'
                                and t.type = 'purchase'
                                and tp."ProductId" = p.id
                        ) - (
                            select SUM(tp.quantity)
                            from "TransactionProducts" as tp
                                join "Transactions" as t on t.id = tp."TransactionId"
                            where tp.status = 'closed'
                                and t.type = 'sale'
                                and tp."ProductId" = p.id
                        )
                    ),
                    0
                ) as "inStock"
            from "Products" as p inner join "Categories" as c
            on "categoryId" = c.id ${filter}
            LIMIT :limit OFFSET :offset;`,
        {
          replacements: {
            barcode: `%${barcode}%`,
            title: `%${title}%`,
            categoryId,
            limit,
            offset
          },
          type: QueryTypes.SELECT
        }
      );
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
