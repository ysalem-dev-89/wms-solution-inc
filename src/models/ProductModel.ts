import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyAddAssociationMixin
} from 'sequelize';
import TransactionProduct from './TransactionProductModel';
import { sequelize } from '../db/connection';

export default class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare icon: string;
  declare price: number;
  declare discount: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare addTransactionProduct: HasManyAddAssociationMixin<
    TransactionProduct,
    TransactionProduct['id']
  >;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { modelName: 'Product', sequelize }
);

TransactionProduct.belongsTo(Product, {
  foreignKey: 'ProductId'
});

Product.hasMany(TransactionProduct, {
  foreignKey: 'ProductId'
});
