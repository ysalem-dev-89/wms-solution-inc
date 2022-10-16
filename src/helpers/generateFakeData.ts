import { faker } from '@faker-js/faker'

export default class generateFakeData {
  constructor() {
    this.users()
    this.products()
    this.transactions()
  }

  users() {
    const users = [...Array(10)].map(user => ({
      userName: faker.internet.userName(),
      password: faker.internet.password(8),
      email: faker.internet.email(),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    console.log(users)
  }

  products() {
    const products = [...Array(10)].map(product => ({
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      icon: faker.internet.email(),
      price: faker.commerce.price(),
      discount: faker.commerce.price(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    console.log(products)
  }

  transactions() {
    const transactions = [...Array(10)].map(transaction => ({
      id: faker.datatype.uuid(),
      status: 'pending',
      type: 'purchase',
      issuedBy: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    console.log(transactions)
  }
}
