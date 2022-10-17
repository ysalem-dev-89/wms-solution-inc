import { faker } from '@faker-js/faker'
import {
  ITransactionStatus,
  ITransactionType
} from '../interfaces/TransactionInterface'
import { IUser, IProduct, ITransaction } from '../interfaces/FakeDataInterface'
const statusValues = Object.values(ITransactionStatus)
const typeValues = Object.values(ITransactionType)

export default class FakeData {
  generateUsers(): IUser[] {
    return [...Array(100)].map(() => ({
      id: faker.datatype.uuid(),
      userName: faker.internet.userName(),
      password: '$2a$10$Zco2hCwKBrjQ4v/Xcxb9P.U0Rvp5PxgY9F2tfJJqv16vvcJCxwzka',
      email: faker.internet.email(),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }

  generateProducts(): IProduct[] {
    return [...Array(100)].map(() => ({
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      icon: faker.internet.email(),
      price: faker.commerce.price(),
      discount: faker.commerce.price(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }

  generateTransactions(): ITransaction[] {
    return [...Array(100)].map(() => ({
      id: faker.datatype.uuid(),
      status: statusValues[Math.floor(Math.floor(Math.random() * 3))],
      type: typeValues[Math.floor(Math.floor(Math.random() * 2))],
      issuedBy: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }

  // generateTransaction_Product(): transaction[] {
  //   return [...Array(10)].map(() => ({
  //     id: faker.datatype.uuid(),
  //     status: statusValues[Math.ceil(Math.random() * 2)],
  //     type: typeValues[Math.ceil(Math.random())],
  //     issuedBy: faker.internet.userName(),
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }))
  // }
}
