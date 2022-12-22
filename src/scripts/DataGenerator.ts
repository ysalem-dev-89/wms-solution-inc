/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { User, Role } from '../interfaces/UserInterface';
import { ProductInterface, Unit } from '../interfaces/ProductInterface';
import Category from '../interfaces/CategoryInterface';
import {
  Transaction,
  TransactionStatus,
  TransactionType
} from '../interfaces/TransactionInterface';
import { TransactionProduct } from '../interfaces/TransactionProductInterface';

export default class DataGenerator {
  static PRODUCTS_COUNT = 100;
  static CATEGORIES_COUNT = 15;
  static transactions: Transaction[] = [];
  static transactionsProducts: TransactionProduct[] = [];
  static updatedSalePrices: any = {};
  static saleStatus = [TransactionStatus.Closed, TransactionStatus.Reversed];
  static users = [
    { username: 'superAdmin', role: Role.superAdmin },
    { username: 'admin', role: Role.admin },
    { username: 'transactions', role: Role.transactions },
    { username: 'stock', role: Role.stock }
  ];
  static categories = [
    'Snacks',
    'Meats',
    'Chocolates',
    'Milk/Cheeses',
    'Frozen Meats',
    'Drinks',
    'Books',
    'Movies',
    'Electronic',
    'BluRay',
    'DVD',
    'Games',
    'PC',
    'XBox',
    'Music'
  ];

  static incrementDateByDay = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  };

  static generateBarcode = () => {
    const val1 = Math.floor(100000 + Math.random() * 999999);
    const val2 = Math.floor(10000 + Math.random() * 99999);
    return '7 ' + val1 + ' ' + val2;
  };

  static createTransaction(
    id: number,
    type: TransactionType,
    date: Date
  ): Transaction {
    return {
      id,
      type,
      issuedBy: faker.datatype.number({ min: 1, max: 2 }),
      createdAt: date,
      updatedAt: date
    };
  }

  static createTransactionProduct(
    TransactionId: number,
    ProductId: number,
    status: TransactionStatus,
    unitPrice: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
  ): TransactionProduct {
    return {
      TransactionId,
      ProductId,
      unitPrice,
      status,
      quantity,
      createdAt,
      updatedAt
    };
  }
  static createTempSale(
    ProductId: number,
    quantity: number,
    unitPrice: number,
    createdAt: Date
  ) {
    return {
      ProductId,
      quantity,
      unitPrice,
      createdAt
    };
  }

  static generateUsers(): User[] {
    return this.users.map(user => ({
      username: user.username,
      password: '$2a$12$R34l5gjz4FICkMyJtdlPouHVhprTio7jh8J3E7v3g/9h9D69UrPVG',
      email: `${user.username}@gmail.com`,
      role: user.role,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static generateProducts(): Omit<ProductInterface, 'id'>[] {
    return [...Array(this.PRODUCTS_COUNT)].map((_, i) => {
      const title = faker.commerce.productName();
      return {
        barcode: this.generateBarcode(),
        title,
        description: faker.commerce.productDescription(),
        icon: `https://source.unsplash.com/100x100/?${title}`,
        price:
          this.updatedSalePrices[i + 1] ||
          Number(faker.commerce.price(50, 100)),
        discount: faker.datatype.number({ min: 3, max: 20 }) / 100, // assure we still in profit
        categoryId: faker.datatype.number({
          min: 1,
          max: this.CATEGORIES_COUNT
        }),
        unit: faker.helpers.arrayElement(Object.values(Unit)),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
  }

  static generateCategories(): Omit<Category, 'id'>[] {
    return this.categories.map((cat: string) => ({
      name: cat,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static generateTransactions(id: number, counter: number, limit: number) {
    if (counter >= limit) {
      return;
    }

    const createdAt = faker.date.between(
      '2018-01-01T00:00:00.000Z',
      '2022-12-31T00:00:00.000Z'
    );
    const newPurchaseTransaction = this.createTransaction(
      id,
      TransactionType.Purchase,
      createdAt
    );
    this.transactions.push(newPurchaseTransaction);

    const nextID = +this.generateTransactionsProducts(createdAt, +id);
    counter++;
    this.generateTransactions(nextID, counter, limit);
    return {
      transactions: this.transactions,
      transactionsProducts: this.transactionsProducts
    };
  }

  static generateTransactionsProducts(createdAt: Date, TransactionId: number) {
    //! ==================== PURCHASES TP ====================
    const randomPatch = faker.datatype.number({ min: 1, max: 10 });
    const productsIds = [...Array(this.PRODUCTS_COUNT)].map((_, i) => i + 1);
    const shuffProdsIds = faker.helpers
      .shuffle(productsIds)
      .slice(0, randomPatch);

    const purchasesTP: TransactionProduct[] = shuffProdsIds.map(ProductId => {
      const status = faker.helpers.objectValue(TransactionStatus);
      const randomDays = faker.datatype.number({ min: 1, max: 30 });
      const updatedAt =
        status === TransactionStatus.Pending
          ? createdAt
          : this.incrementDateByDay(createdAt, randomDays);
      const quantity = Number(faker.commerce.price(1, 10)) * 100;
      const unitPrice = Number(faker.commerce.price(2, 100));

      const newPurchaseTP = this.createTransactionProduct(
        TransactionId,
        ProductId,
        status,
        unitPrice,
        quantity,
        createdAt,
        updatedAt
      );
      this.transactionsProducts.push(newPurchaseTP);
      return newPurchaseTP;
    });
    //! ==================== SALES TP ====================
    // distribute (closed) purchases into diff sales (ranged in 3 months)
    const tempSalesTP: any = {};
    const closedTPs = purchasesTP.filter(
      tp => tp.status === TransactionStatus.Closed
    );
    const dates = closedTPs.map((tp: any) => tp.updatedAt);
    const minClose = new Date(Math.min(...dates));
    const maxClose = new Date(Math.max(...dates));
    let counterID = TransactionId + 1;

    // distribute upto 20 sales TP per each purchase TP day.
    for (
      let startTime = this.incrementDateByDay(minClose, 1);
      startTime <= this.incrementDateByDay(maxClose, 60);
      startTime = this.incrementDateByDay(startTime, 1)
    ) {
      const randomLength = faker.datatype.number({ min: 1, max: 20 });
      [...Array(randomLength)].forEach(() => {
        const saleCreatedAt = faker.date.between(
          startTime,
          this.incrementDateByDay(startTime, 1)
        );
        tempSalesTP[counterID] = {
          saleCreatedAt,
          products: []
        };
        counterID++;
      });
    }
    // fill products array within each transaction(id).
    for (const tp of closedTPs) {
      let maxQuantity = tp.quantity;
      for (let i = TransactionId + 1; i < counterID; i++) {
        const randQuantity = faker.datatype.number({
          min: 0,
          max: tp.quantity * 0.05
        });
        // assure no sale happens before it's purchased and available in stock.
        if (tp.updatedAt || new Date() < tempSalesTP[i].saleCreatedAt) {
          if (maxQuantity - randQuantity <= 0) {
            const salePrice = Number(
              (
                tp.unitPrice +
                tp.unitPrice *
                  (faker.datatype.number({ min: 60, max: 80 }) / 100)
              ).toFixed(1)
            );
            // update products's last sale price (since it varies over years)
            this.updatedSalePrices[tp.ProductId || 0] = salePrice;

            const newTempSale = this.createTempSale(
              tp.ProductId || 0,
              maxQuantity,
              salePrice,
              tempSalesTP[i].saleCreatedAt
            );
            tempSalesTP[i].products.push(newTempSale);
            break;
          } else {
            if (randQuantity === 0) {
              continue;
            }
            maxQuantity -= randQuantity;
            const newTempSale = this.createTempSale(
              tp.ProductId || 0,
              randQuantity,
              tp.unitPrice,
              tempSalesTP[i].saleCreatedAt
            );
            tempSalesTP[i].products.push(newTempSale);
          }
        }
      }
    }
    // filter temp empty products due to randomization, with accurate incremented id.
    const formattedSalesTP: any = {};
    let counter = TransactionId + 1;
    for (const id in tempSalesTP) {
      if (tempSalesTP[id].products.length > 0) {
        formattedSalesTP[counter] = tempSalesTP[id];
        counter++;
      }
    }

    //! create new sale transaction and new sales tp.
    for (const id in formattedSalesTP) {
      const newSaleT = this.createTransaction(
        +id,
        TransactionType.Sale,
        formattedSalesTP[id].saleCreatedAt
      );
      this.transactions.push(newSaleT);
      formattedSalesTP[id].products.forEach((tp: any) => {
        const status =
          this.saleStatus[faker.datatype.number({ min: 0, max: 1 })];
        const randomDays = faker.datatype.number({ min: 1, max: 30 });
        const saleUpdatedAt = this.incrementDateByDay(tp.createdAt, randomDays);

        const newSaleTP = this.createTransactionProduct(
          Number(id),
          tp.ProductId,
          status,
          tp.unitPrice,
          tp.quantity,
          tp.createdAt,
          saleUpdatedAt
        );
        this.transactionsProducts.push(newSaleTP);
      });
    }

    // return next transaction id to start over.
    const idsArr = Object.keys(formattedSalesTP);
    const nextId = idsArr.length
      ? Number(idsArr[idsArr.length - 1]) + 1
      : TransactionId + 1;
    return nextId;
  }
}
