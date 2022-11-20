import { Request } from 'express';

export interface ProductRequest extends Request {
  params: {
    id: string;
  };

  query: {
    id?: string;
    title?: string;
    barcode?: string;
    categoryId?: string;
    limit?: string;
    offset?: string;
  };

  body: {
    barcode: string;
    title: string;
    description: string;
    icon: string;
    price: number;
    discount: number;
    unit: string;
  };
}
