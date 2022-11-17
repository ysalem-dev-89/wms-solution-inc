import {
  DataTypes,
  Model,
  CreationOptional,
  HasManyAddAssociationMixin
} from 'sequelize';
import { sequelize } from '../db/connection';
import { Role } from '../interfaces/UserInterface';
import Transaction from './TransactionModel';

export default class User extends Model {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare role: Role;
  declare deleted: boolean;
  declare addTransaction: HasManyAddAssociationMixin<
    Transaction,
    Transaction['id']
  >;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    modelName: 'User',
    sequelize
  }
);

User.hasMany(Transaction, {
  foreignKey: 'issuedBy'
});
Transaction.belongsTo(User, {
  foreignKey: 'issuedBy'
});
