import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../db/connection';
import {
  TransactionStatus,
  TransactionType
} from 'interfaces/transactionInterface';

export class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id: CreationOptional<number>;
  declare status: TransactionStatus;
  declare type: TransactionType;
  declare issuedBy: number;
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
    issuedBy: {
      type: DataTypes.INTEGER,
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
