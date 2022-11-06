import { faker } from '@faker-js/faker';
import { User, Role } from '../interfaces/UserInterface';
import Product from '../interfaces/ProductInterface';
import {
  Transaction,
  TransactionStatus,
  TransactionType
} from '../interfaces/TransactionInterface';
import { TransactionProduct } from '../interfaces/TransactionProductInterface';

export default class DataGenerator {
  static USERS_COUNT = 10;
  static PRODUCTS_COUNT = 1000;
  static transactions: Omit<Transaction, 'id'>[] = [];
  static transactionsProducts: TransactionProduct[] = [];

  static incrementDateByDay = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  };

  static createTransaction(
    type: TransactionType,
    date: Date
  ): Omit<Transaction, 'id'> {
    return {
      type,
      issuedBy: 1,
      createdAt: date,
      updatedAt: date
    };
  }

  static createTP(
    transactionId: number,
    productId: number,
    status: TransactionStatus,
    unitPrice: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
  ): TransactionProduct {
    return {
      TransactionId: transactionId,
      ProductId: productId,
      unitPrice,
      status,
      quantity,
      createdAt,
      updatedAt
    };
  }
  static createTempSale(
    productId: number,
    quantity: number,
    unitPrice: number,
    createdAt: Date
  ) {
    return {
      productId,
      quantity,
      unitPrice,
      createdAt
    };
  }

  static generateUsers(): Omit<User, 'id'>[] {
    return [...Array(this.USERS_COUNT)].map((_, i) => ({
      username: faker.internet.userName(),
      password: '$2a$10$Zco2hCwKBrjQ4v/Xcxb9P.U0Rvp5PxgY9F2tfJJqv16vvcJCxwzka',
      email: faker.internet.email(),
      role: i === 0 ? Role.admin : Role.customer,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static generateProducts(): Omit<Product, 'id'>[] {
    return [...Array(this.PRODUCTS_COUNT)].map((_, _i) => ({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      icon: faker.internet.avatar(),
      price: Number(faker.commerce.price(20, 2000)),
      discount: Number(faker.commerce.price(0, 100)) / 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static generateTransactions(id: number, counter: number, limit: number) {
    if (counter >= limit) {
      return;
    }

    const createdAt = faker.date.between(
      '2020-01-01T00:00:00.000Z',
      '2022-01-01T00:00:00.000Z'
    );
    const newPurchaseT = this.createTransaction(
      TransactionType.Purchase,
      createdAt
    );
    this.transactions.push(newPurchaseT);

    const nextID = +this.generateTransactionsProducts(createdAt, +id);
    counter++;
    this.generateTransactions(nextID, counter, limit);
    return {
      transactions: this.transactions,
      transactionsProducts: this.transactionsProducts
    };
  }

  static generateTransactionsProducts(createdAt: Date, transactionId: number) {
    //! ==================== PURCHASES TP ====================
    const randomPatch = faker.datatype.number({ min: 1, max: 5 });
    const productsIds = [...Array(this.PRODUCTS_COUNT)].map((_, i) => i + 1);
    const shuffProdsIds = faker.helpers
      .shuffle(productsIds)
      .slice(0, randomPatch);

    const purchasesTP: TransactionProduct[] = shuffProdsIds.map(productId => {
      const status = faker.helpers.objectValue(TransactionStatus);
      const randomDays = faker.datatype.number({ min: 1, max: 30 });
      const updatedAt =
        status === TransactionStatus.Pending
          ? createdAt
          : this.incrementDateByDay(createdAt, randomDays);
      const quantity = Number(faker.commerce.price(1, 10)) * 100;
      const unitPrice = Number(faker.commerce.price(5, 50));
      const newPurchaseTP = this.createTP(
        transactionId,
        productId,
        status,
        quantity,
        unitPrice,
        createdAt,
        updatedAt
      );
      this.transactionsProducts.push(newPurchaseTP);
      return newPurchaseTP;
    });
    //! ==================== SALES TP ====================
    // distribute those (closed) purchases into diff sales (ranged in 3 months)
    const tempSalesTP: any = {};
    const closedTPs = purchasesTP.filter(
      tp => tp.status === TransactionStatus.Closed
    );
    const dates = closedTPs.map((tp: any) => tp.updatedAt);
    const minClose = new Date(Math.min(...dates));
    const maxClose = new Date(Math.max(...dates));
    let counterID = transactionId + 1;

    // distribute upto 10 sales TP per each purchase TP day.
    for (
      let startTime = this.incrementDateByDay(minClose, 1);
      startTime <= this.incrementDateByDay(maxClose, 60);

    ) {
      const randomLength = faker.datatype.number({ min: 1, max: 10 });
      for (let i = 0; i < randomLength; i++) {
        const saleCreatedAt = faker.date.between(
          startTime,
          this.incrementDateByDay(startTime, 1)
        );
        tempSalesTP[counterID] = {
          saleCreatedAt,
          products: []
        };
        counterID++;
      }
      startTime = this.incrementDateByDay(startTime, 1);
    }
    // fill products array within each transaction(id).
    for (const tp of closedTPs) {
      let maxQuantity = tp.quantity;
      for (let i = transactionId + 1; i < counterID; i++) {
        const randQuantity = faker.datatype.number({
          min: 0,
          max: tp.quantity * 0.05
        });
        // assure no sale happens before it's purchased and available in stock.
        if (tp.updatedAt < tempSalesTP[i].saleCreatedAt) {
          if (maxQuantity - randQuantity <= 0) {
            const newTempSale = this.createTempSale(
              tp.ProductId,
              maxQuantity,
              tp.unitPrice,
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
              tp.ProductId,
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
    let counter = transactionId + 1;
    for (const id in tempSalesTP) {
      if (tempSalesTP[id].products.length > 0) {
        formattedSalesTP[counter] = tempSalesTP[id];
        counter++;
      }
    }

    // create new sale transaction and new sales tp.
    for (const id in formattedSalesTP) {
      const newSaleT = this.createTransaction(
        TransactionType.Sale,
        formattedSalesTP[id].saleCreatedAt
      );
      this.transactions.push(newSaleT);
      formattedSalesTP[id].products.forEach((tp: any) => {
        const status = faker.helpers.objectValue(TransactionStatus);
        const randomDays = faker.datatype.number({ min: 1, max: 30 });
        const saleUpdatedAt =
          status === TransactionStatus.Pending
            ? tp.createdAt
            : this.incrementDateByDay(tp.createdAt, randomDays);

        const newSaleTP = this.createTP(
          +id,
          tp.productId,
          status,
          tp.quantity,
          +tp.unitPrice * 1.5,
          tp.createdAt,
          saleUpdatedAt
        );
        this.transactionsProducts.push(newSaleTP);
      });
    }

    // return next transaction id to start over.
    return transactionId + 1;
  }
}
