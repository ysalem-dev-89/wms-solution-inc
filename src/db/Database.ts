import { sequelize } from './connection';
import Product from '../models/ProductModel';
import User from '../models/UserModel';
import Transaction from '../models/TransactionModel';
import ProductTransaction from '../models/TransactionProductModel';

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
    Product.belongsToMany(Transaction, { through: ProductTransaction });
    Transaction.belongsToMany(Product, { through: ProductTransaction });
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
