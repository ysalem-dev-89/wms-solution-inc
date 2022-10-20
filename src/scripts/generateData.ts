import fs from 'fs';
import { join } from 'path';
import DataGenerator from './DataGenerator';

const outputData = (fileName: string, data: string): void => {
  const path = join(__dirname, 'output', fileName);
  try {
    fs.writeFileSync(path, data);
  } catch (error) {
    console.error('FAILED TO OUTPUT DATA: ', error);
  }
};

const users = JSON.stringify(DataGenerator.generateUsers(), null, 2);
const products = JSON.stringify(DataGenerator.generateProducts(), null, 2);
const transactions = JSON.stringify(
  DataGenerator.generateTransactions(),
  null,
  2
);
const transactionsProducts = JSON.stringify(
  DataGenerator.generateTransactionsProducts(),
  null,
  2
);

outputData('users.json', users);
outputData('products.json', products);
outputData('transactions.json', transactions);
outputData('transactionsProducts.json', transactionsProducts);
