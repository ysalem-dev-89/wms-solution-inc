import Category from '../models/CategoryModel';
import CategoryInterface from 'interfaces/CategoryInterface';
import { Op } from 'sequelize';
import { sequelize } from '../db/connection';
import Product from '../models/ProductModel';
export default class CategoryQuery {
  static createNewCategory = async (name: string) => {
    return Category.create(
      { name },
      {
        returning: true
      }
    );
  };
  static updateOneCategory = async (category: CategoryInterface) => {
    const { id, name } = category;
    return Category.update(
      { name },
      {
        where: {
          id
        },
        returning: true
      }
    );
  };

  static deleteOneCategory = async (id: string) => {
    return Category.destroy({
      where: {
        id
      }
    });
  };

  static getCategories = async ({
    name,
    limit,
    offset
  }: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    return Category.findAndCountAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
        [Op.like]: `%${name.toLowerCase()}%`
      }),
      attributes: [
        'name',
        'Category.id',
        'Category.createdAt',
        [
          sequelize.fn('count', sequelize.col('Products.categoryId')),
          'productsCount'
        ]
      ],
      include: [
        {
          model: Product,
          attributes: [],
          duplicating: false
        }
      ],
      order: [['id', 'DESC']],
      group: ['name', 'Category.id', 'Category.createdAt'],
      raw: true,
      limit,
      offset
    });
  };
}
