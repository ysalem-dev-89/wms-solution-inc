export interface ProductInterface {
  id?: number;
  barcode?: string;
  title: string;
  categoryId?: number;
  description: string;
  icon: string;
  price: number;
  discount: number;
  unit?: string;
}

export enum Unit {
  kg = 'kg',
  pocket = 'pocket',
  bag = 'bag',
  piece = 'piece',
  slice = 'slice',
  gram = 'gram',
  dozen = 'dozen',
  cm = 'cm',
  meter = 'meter'
}
