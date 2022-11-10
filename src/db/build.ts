import User from '../models/UserModel';
import Product from '../models/ProductModel';
import Category from '../models/CategoryModel';
import Transaction from '../models/TransactionModel';
import TransactionProduct from '../models/TransactionProductModel';
import { sequelize } from './connection';
import { join } from 'path';
import csvtojson from 'csvtojson';

const getPath = (fileName: string) => {
  return join(__dirname, '..', 'scripts', 'output', fileName);
};

(async (): Promise<void> => {
  try {
    sequelize.sync({ force: true }).then(() => {
      return csvtojson()
        .fromFile(getPath('users.csv'))
        .then(json => User.bulkCreate(json))
        .then(() => csvtojson().fromFile(getPath('categories.csv')))
        .then(json => Category.bulkCreate(json))
        .then(() => csvtojson().fromFile(getPath('products.csv')))
        .then(json => Product.bulkCreate(json))
        .then(() => csvtojson().fromFile(getPath('transactions.csv')))
        .then(json => Transaction.bulkCreate(json))
        .then(() => csvtojson().fromFile(getPath('transactionsProducts.csv')))
        .then(json => TransactionProduct.bulkCreate(json));
    });
  } catch (error: any) {
    console.log('Build Database Failed', error);
  }
})();
