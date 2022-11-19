import {
  DataTypes,
  Model,
  CreationOptional,
  HasManyAddAssociationMixin
} from 'sequelize';
import TransactionProduct from './TransactionProductModel';
import { sequelize } from '../db/connection';
import { Unit } from '../interfaces/ProductInterface';

export default class Product extends Model {
  declare id: CreationOptional<number>;
  declare barcode: string;
  declare title: string;
  declare description: string;
  declare icon: string;
  declare price: number;
  declare discount: number;
  declare unit: Unit;
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
    barcode: {
      type: DataTypes.STRING,
      unique: true
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
    unit: {
      type: DataTypes.ENUM,
      values: Object.values(Unit)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { modelName: 'Product', sequelize }
);

Product.hasMany(TransactionProduct, {
  foreignKey: 'ProductId'
});
TransactionProduct.belongsTo(Product, {
  foreignKey: 'ProductId'
});
