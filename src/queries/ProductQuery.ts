import Product from '../models/ProductModel';
import ProductInterface from 'interfaces/ProductInterface';

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
}
