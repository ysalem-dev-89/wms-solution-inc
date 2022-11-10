import { TransactionStatus } from './TransactionInterface';

export interface TransactionProduct {
  id?: number;
  ProductId: number;
  TransactionId: number;
  status: TransactionStatus;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
