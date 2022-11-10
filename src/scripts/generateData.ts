import fs from 'fs';
import { join } from 'path';
import crypto from 'crypto';
import { Parser } from 'json2csv';
import DataGenerator from './DataGenerator';
import { Transaction } from '../interfaces/TransactionInterface';
import { TransactionProduct } from '../interfaces/TransactionProductInterface';

const createHash = (str: string): string => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

const eliminateDuplicates = (
  arr: { ProductId: number; TransactionId: number }[]
) => {
  const hashSet = new Set();
  const uniqueArray = [] as unknown as {
    ProductId: number;
    TransactionId: number;
  }[];

  arr.forEach(obj => {
    const hash = createHash(`${obj.ProductId}-${obj.TransactionId}`);

    if (!hashSet.has(hash)) {
      uniqueArray.push(obj);
      hashSet.add(hash);
    }
  });

  return uniqueArray;
};

const outputData = (fileName: string, data: string, fields: string[]): void => {
  const path = join(__dirname, 'output', fileName);
  const parser = new Parser({ fields });

  try {
    fs.writeFileSync(path, parser.parse(JSON.parse(data)));
  } catch (error) {
    console.error('FAILED TO OUTPUT DATA: ', error);
  }
};

const users = JSON.stringify(DataGenerator.generateUsers(), null, 2);
const categories = JSON.stringify(DataGenerator.generateCategories(), null, 2);
const transactionsObj = DataGenerator.generateTransactions(1, 0, 1000) as {
  transactions: Transaction[];
  transactionsProducts: TransactionProduct[];
};
const transactions = JSON.stringify(transactionsObj.transactions, null, 2);
const transactionsProducts = JSON.stringify(
  eliminateDuplicates(transactionsObj.transactionsProducts),
  null,
  2
);
const products = JSON.stringify(DataGenerator.generateProducts(), null, 2);

outputData('users.csv', users, [
  'username',
  'password',
  'email',
  'role',
  'createdAt',
  'updatedAt'
]);
outputData('categories.csv', categories, ['name', 'createdAt', 'updatedAt']);
outputData('transactions.csv', transactions, [
  'type',
  'issuedBy',
  'createdAt',
  'updatedAt'
]);
outputData('transactionsProducts.csv', transactionsProducts, [
  'ProductId',
  'TransactionId',
  'status',
  'unitPrice',
  'quantity',
  'createdAt',
  'updatedAt'
]);
outputData('products.csv', products, [
  'title',
  'description',
  'icon',
  'price',
  'discount',
  'categoryId',
  'createdAt',
  'updatedAt'
]);
