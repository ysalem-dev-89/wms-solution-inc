import Product from '../models/ProductModel';
import { ProductInterface } from '../interfaces/ProductInterface';
import { sequelize } from '../db/connection';
import { Op, QueryTypes } from 'sequelize';
export default class ProductQuery {
  static update = async (product: ProductInterface) => {
    const { id, barcode, title, description, icon, price, discount, unit } =
      product;
    return Product.update(
      { barcode, title, description, icon, price, discount, unit },
      {
        where: {
          id
        },
        returning: true
      }
    );
  };

  static deleteProduct = async (id: number): Promise<number> => {
    return Product.destroy({
      where: {
        id
      }
    });
  };

  static getOneProduct = ({ id }: { id: number }) => Product.findByPk(id);

  static getProductsByTitle = ({ title }: { title: string }) =>
    Product.findAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('title')), {
        [Op.like]: `%${title.toLowerCase()}%`
      })
    });

  static getProductsByBarcode = ({ barcode }: { barcode: string }) =>
    Product.findAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('barcode')), {
        [Op.like]: `%${barcode.toLowerCase()}%`
      })
    });

  static getProducts = ({
    id,
    barcode,
    title,
    categoryId,
    limit,
    offset
  }: {
    id?: number;
    barcode?: string;
    title?: string;
    categoryId?: string;
    limit?: number;
    offset?: number;
  }) => {
    let filter = id ? 'p.id = :id' : '';
    filter += categoryId ? (id ? '' : '"categoryId" = :categoryId') : '';
    if (barcode) {
      filter += id ? '' : (filter ? ' AND ' : '') + 'barcode like :barcode';
    } else if (title) {
      filter += id
        ? ''
        : (filter ? ' AND ' : '') + 'LOWER(title) like LOWER(:title)';
    }

    if (filter) filter = 'where ' + filter;

    return sequelize.query(
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
          id,
          barcode: `%${barcode}%`,
          title: `%${title}%`,
          categoryId,
          limit,
          offset
        },
        type: QueryTypes.SELECT
      }
    );
  };
}
