import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  Association,
  NonAttribute,
  CreationOptional
} from 'sequelize'
import { sequelize } from '../db/connection'
import { Book } from './BookModel'

export class User extends Model<
  InferAttributes<User, { omit: 'books' }>,
  InferCreationAttributes<User, { omit: 'books' }>
> {
  declare id: CreationOptional<number>
  declare username: string
  declare email: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare books?: NonAttribute<Book[]>
  declare static associations: {
    books: Association<User, Book>
  }
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

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'users',
    sequelize
  }
)

User.hasMany(Book, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'books'
})
Book.belongsTo(User, { as: 'owner' })
