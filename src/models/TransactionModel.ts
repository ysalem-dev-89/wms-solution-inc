import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../db/Database';
import {
  TransactionStatus,
  TransactionType
} from 'interfaces/transactionInterface';

export default class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id: CreationOptional<number>;
  declare status: TransactionStatus;
  declare type: TransactionType;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'reversed', 'closed'],
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['purchase', 'sale'],
      allowNull: false
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'transactions',
    sequelize
  }
);
