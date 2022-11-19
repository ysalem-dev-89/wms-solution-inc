import { Unit } from './Enums';

export interface ProductInterface {
  id?: number;
  barcode: string;
  title: string;
  price: number;
  icon?: string;
  discount: number;
  inStock?: number;
  unit?: Unit;
  createdAt?: number;
  categoryId?: number;
}
