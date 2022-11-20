import { TransactionStatus } from './Enums';
import { ProductInterface } from './ProductInterface';

export interface TransactionProductInterface {
  id?: number;
  ProductId: number;
  status: TransactionStatus;
  unitPrice: number;
  barcode?: string;
  title?: string;
  unit?: string;
  discount?: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  inStock?: number;
  Product: ProductInterface;
  TransactionId: number;
}
