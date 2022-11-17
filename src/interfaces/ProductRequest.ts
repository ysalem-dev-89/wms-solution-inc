import { Request } from 'express';

export interface ProductRequest extends Request {
  params: {
    id: string;
  };

  query: {
    title?: string;
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
