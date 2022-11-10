import { Request } from 'express';
import { TransactionType } from './TransactionInterface';
import { TransactionProduct } from './TransactionProductInterface';
export interface TransactionRequest extends Request {
  params: {
    id?: string;
  };

  query: {
    type: TransactionType;
    search: string;
    limit?: string;
    offset?: string;
  };

  body: {
    type: TransactionType;
    issuedBy: number;
    transactionProducts: Array<TransactionProduct>;
  };
}
