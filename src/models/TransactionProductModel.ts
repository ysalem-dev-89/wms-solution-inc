import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelize } from '../db/Database';
export default class TransactionProduct extends Model {
  declare id: CreationOptional<number>;
}

TransactionProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    freezeTableName: true,
    modelName: 'transaction_product',
    sequelize
  }
);
