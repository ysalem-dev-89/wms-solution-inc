import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelize } from '../db/connection';
import { Role } from '../interfaces/UserInterface';

export default class User extends Model {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare role: Role;
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
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      allowNull: false
    }
  },
  {
    modelName: 'user',
    sequelize
  }
);
