import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelize } from '../db/connection';
import Product from './ProductModel';

export default class Category extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    modelName: 'Category',
    sequelize
  }
);

Category.hasMany(Product, {
  foreignKey: 'categoryId'
});
Product.belongsTo(Category, {
  foreignKey: 'categoryId'
});
