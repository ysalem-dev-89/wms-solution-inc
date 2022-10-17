import fs from 'fs'
import { join } from 'path'
import FakeData from './FakeData'

const outputFaker = (fileName: string, data: string): void => {
  const path = join(__dirname, '..', 'scripts', 'output', `${fileName}`)
  try {
    fs.writeFileSync(path, data)
  } catch (err) {
    console.error(err)
  }
}

const users = JSON.stringify(new FakeData().generateUsers(), null, 2)
const products = JSON.stringify(new FakeData().generateProducts(), null, 2)
const transactions = JSON.stringify(
  new FakeData().generateTransactions(),
  null,
  2
)
outputFaker('users.json', users)
outputFaker('products.json', products)
outputFaker('transactions.json', transactions)
