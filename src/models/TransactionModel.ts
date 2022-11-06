import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyCreateAssociationMixin
} from 'sequelize';
import { TransactionType } from '../interfaces/TransactionInterface';
import { sequelize } from '../db/connection';
import TransactionProduct from './TransactionProductModel';

export default class Transaction extends Model {
  declare id: CreationOptional<number>;
  declare type: TransactionType;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createTransactionProduct: HasManyCreateAssociationMixin<
    TransactionProduct,
    TransactionProduct['id']
  >;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(TransactionType),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    modelName: 'Transaction',
    sequelize
  }
);

TransactionProduct.belongsTo(Transaction, {
  onDelete: 'CASCADE',
  foreignKey: 'TransactionId'
});
Transaction.hasMany(TransactionProduct, {
  onDelete: 'CASCADE',
  foreignKey: 'TransactionId'
});
