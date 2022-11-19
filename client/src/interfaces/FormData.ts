import { Role, TransactionStatus, TransactionType } from './Enums';

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
  search?: string;
};

export type TransactionProductData = {
  price: number;
  discount: number;
  quantity: number;
  status: TransactionStatus;
  productId: number;
};

export type UserData = {
  id?: number;
  username: string;
  password?: string;
  confirmPassword?: string;
  email: string;
  role: Role;
};
