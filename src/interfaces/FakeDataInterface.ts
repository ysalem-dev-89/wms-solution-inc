import { ITransactionStatus, ITransactionType } from './TransactionInterface'

export type IUser = {
  id: string
  userName: string
  password: string
  email: string
  role: 'customer'
  createdAt: Date
  updatedAt: Date
}
export type IProduct = {
  id: string
  description: string
  icon: string
  price: string
  discount: string
  createdAt: Date
  updatedAt: Date
}
export type ITransaction = {
  id: string
  status: ITransactionStatus
  type: ITransactionType
  issuedBy: string
  createdAt: Date
  updatedAt: Date
}
