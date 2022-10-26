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
import Category from '../models/CategoryModel';

const Products = [
  {
    title: 'product1',
    description: 'desc1',
    icon: '*******',
    price: 6,
    discount: 12,
    categoryId: 1
  },
  {
    title: 'product2',
    description: 'desc2',
    icon: '////////',
    price: 20,
    discount: 3,
    categoryId: 1
  },
  {
    title: 'product3',
    description: 'desc3',
    icon: '----------',
    price: 14,
    discount: 9,
    categoryId: 2
  },
  {
    title: 'product1',
    description: 'desc1',
    icon: '*******',
    price: 6,
    discount: 12,
    categoryId: 2
  },
  {
    title: 'product2',
    description: 'desc2',
    icon: '////////',
    price: 20,
    discount: 3,
    categoryId: 2
  },
  {
    title: 'product3',
    description: 'desc3',
    icon: '----------',
    price: 14,
    discount: 9,
    categoryId: 1
  },
  {
    title: 'product1',
    description: 'desc1',
    icon: '*******',
    price: 6,
    discount: 12,
    categoryId: 1
  },
  {
    title: 'product2',
    description: 'desc2',
    icon: '////////',
    price: 20,
    discount: 3,
    categoryId: 3
  },
  {
    title: 'product3',
    description: 'desc3',
    icon: '----------',
    price: 14,
    discount: 9,
    categoryId: 3
  }
];

const categories = [
  { name: '1-Snacks' },
  { name: '2-Meats' },
  { name: '3-Chocolates' },
  { name: '4-Milk/Cheeses' },
  { name: '5-Frozen Meats' },
  { name: '6-Drinks' },
  { name: '7-Snacks' },
  { name: '8-Meats' },
  { name: '9-Chocolates' },
  { name: '10-Milk/Cheeses' },
  { name: '11-Frozen Meats' },
  { name: '12-Drinks' },
  { name: '13-Snacks' },
  { name: '14-Meats' },
  { name: '15-Chocolates' },
  { name: '16-Milk/Cheeses' },
  { name: '17-Frozen Meats' },
  { name: '18-Drinks' },
  { name: '19-Snacks' },
  { name: '20-Meats' },
  { name: '21-Chocolates' },
  { name: '22-Milk/Cheeses' },
  { name: '23-Frozen Meats' },
  { name: '24-Drinks' },
  { name: '25-Snacks' },
  { name: '26-Meats' },
  { name: '27-Chocolates' },
  { name: '28-Milk/Cheeses' },
  { name: '29-Frozen Meats' },
  { name: '30-Drinks' }
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
  await Category.bulkCreate(categories);
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
