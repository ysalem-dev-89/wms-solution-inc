import Product from '../models/ProductModel';
import ProductInterface from 'interfaces/ProductInterface';
import { sequelize } from '../db/connection';
import { Op } from 'sequelize';
export default class ProductQuery {
  static update = async (product: ProductInterface) => {
    const { id, title, description, icon, price, discount } = product;
    return Product.update(
      { title, description, icon, price, discount },
      {
        where: {
          id
        },
        returning: true
      }
    );
  };

  static deleteProduct = async (id: number): Promise<number> => {
    return Product.destroy({ where: { id } });
  };

  static getOneProduct = ({ id }: { id: number }) => Product.findByPk(id);

  static getProductsByTitle = ({ title }: { title: string }) =>
    Product.findAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('title')), {
        [Op.like]: `%${title.toLowerCase()}%`
      })
    });
}
