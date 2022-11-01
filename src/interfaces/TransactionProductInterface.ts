import { TransactionStatus } from './TransactionInterface';

export interface TransactionProduct {
  id?: number;
  ProductId: number;
  status: TransactionStatus;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  TransactionId: number;
}
