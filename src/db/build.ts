import { Role } from '../interfaces/UserInterface';
import {
  TransactionStatus,
  TransactionType
} from '../interfaces/TransactionInterface';
import { sequelize } from './connection';
import Transaction from '../models/TransactionModel';
import TransactionProduct from '../models/TransactionProductModel';
import Product from '../models/ProductModel';
import User from '../models/UserModel';

const Products = [
  {
    title: 'product1',
    description: 'desc1',
    icon: '*******',
    price: 6,
    discount: 12
  },
  {
    title: 'product2',
    description: 'desc2',
    icon: '////////',
    price: 20,
    discount: 3
  },
  {
    title: 'product3',
    description: 'desc3',
    icon: '----------',
    price: 14,
    discount: 9
  }
];

const transactions = [
  { type: TransactionType.Purchase },
  { type: TransactionType.Purchase },
  { type: TransactionType.Sale },
  { type: TransactionType.Sale },
  { type: TransactionType.Sale }
];

const transactionProduct = [
  // purchase
  {
    unitPrice: 15,
    quantity: 500,
    ProductId: 1,
    TransactionId: 1,
    status: TransactionStatus.Closed
  },
  {
    unitPrice: 35,
    quantity: 150,
    ProductId: 2,
    TransactionId: 1,
    status: TransactionStatus.Reversed
  },

  {
    unitPrice: 15,
    quantity: 50,
    ProductId: 3,
    TransactionId: 1,
    status: TransactionStatus.Pending
  },
  {
    unitPrice: 35,
    quantity: 80,
    ProductId: 2,
    TransactionId: 2,
    status: TransactionStatus.Closed
  },
  // SELL *******************
  {
    unitPrice: 15,
    quantity: 20,
    ProductId: 1,
    TransactionId: 3,
    status: TransactionStatus.Closed
  },

  {
    unitPrice: 15,
    quantity: 35,
    ProductId: 2,
    TransactionId: 3,
    status: TransactionStatus.Closed
  },
  {
    unitPrice: 15,
    quantity: 40,
    ProductId: 1,
    TransactionId: 4,
    status: TransactionStatus.Closed
  },
  {
    unitPrice: 15,
    quantity: 15,
    ProductId: 2,
    TransactionId: 5,
    status: TransactionStatus.Closed
  }
];

const populateDB = async (): Promise<void> => {
  await sequelize.sync({ force: true });
  await User.bulkCreate([
    {
      username: 'admin',
      password: '123456',
      email: 'admin@homtail.com',
      role: Role.admin
    }
  ]);
  await Transaction.bulkCreate(transactions);
  await Product.bulkCreate(Products);
  await TransactionProduct.bulkCreate(transactionProduct);
};

(async () => {
  try {
    populateDB();
    console.log('Build Database Successfully');
  } catch (error) {
    console.log('Build Database Failed', error);
  }
})();
