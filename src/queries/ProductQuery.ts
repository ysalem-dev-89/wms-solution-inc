import Product from '../models/ProductModel';
import { ProductInterface } from '../interfaces/ProductInterface';
import { sequelize } from '../db/connection';
import { Op } from 'sequelize';
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
}
