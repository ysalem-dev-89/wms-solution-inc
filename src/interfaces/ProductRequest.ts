import { Request } from 'express';

export interface ProductRequest extends Request {
  params: {
    id: string;
  };

  query: {
    title?: string;
  };

  body: {
    title: string;
    description: string;
    icon: string;
    price: number;
    discount: number;
  };
}
