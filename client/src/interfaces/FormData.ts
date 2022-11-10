import { TransactionStatus, TransactionType } from './Enums';

export type CategorySearch = {
  search: string;
};

export type CategoryData = {
  category: string;
};

export type TransactionData = {
  user: string;
  type: TransactionType;
  createdAt: Date;
  title: string;
  username: string;
};

export type TransactionProductData = {
  price: number;
  discount: number;
  quantity: number;
  status: TransactionStatus;
  productId: number;
};
