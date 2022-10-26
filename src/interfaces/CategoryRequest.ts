import { Request } from 'express';
export interface CategoryRequest extends Request {
  query: {
    name: string;
    limit?: string;
    offset?: string;
  };

  params: {
    id: string;
  };

  body: {
    name: string;
    limit?: number;
    offset?: number;
    search?: string;
  };
}
