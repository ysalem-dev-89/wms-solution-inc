import { Request } from 'express';

export interface ProductRequest extends Request {
  params: {
    id: string;
  };
  body: {
    title: string;
    description: string;
    icon: string;
    price: number;
    discount: number;
  };
}
