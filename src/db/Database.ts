import { sequelize } from './connection';
import Product from '../models/ProductModel';
import User from '../models/UserModel';
import Transaction from '../models/TransactionModel';
import TransactionProduct from '../models/TransactionProductModel';
import Category from '../models/CategoryModel';

export { sequelize };
export default class Database {
  static async connect() {
    try {
      await sequelize.authenticate();
      this.buildRelations();
      // this.populate()
      console.log('DB Connection is established successfully');
    } catch (error) {
      console.error('Unable to connect to the database: \n', error);
    }
  }

  private static async buildRelations() {
    User.hasMany(Transaction, {
      foreignKey: 'issuedBy'
    });
    Transaction.belongsTo(User, {
      foreignKey: 'issuedBy'
    });

    Category.hasMany(Product, {
      foreignKey: 'categoryId'
    });
    Product.belongsTo(Category, {
      foreignKey: 'categoryId'
    });

    Product.hasMany(TransactionProduct, {
      foreignKey: 'productId'
    });
    TransactionProduct.belongsTo(Product, {
      foreignKey: 'productId'
    });

    Transaction.hasMany(TransactionProduct, {
      onDelete: 'CASCADE',
      foreignKey: 'transactionId'
    });
    TransactionProduct.belongsTo(Transaction, {
      onDelete: 'CASCADE',
      foreignKey: 'transactionId'
    });

    // Product.belongsToMany(Transaction, { through: TransactionProduct });
    // Transaction.belongsToMany(Product, { through: TransactionProduct });

    try {
      await sequelize.sync({ force: true });
    } catch (error) {
      console.log(error);
    }
  }

  //   private static async populate() {
  //     // for filling the database with dummy data
  //   }
}
