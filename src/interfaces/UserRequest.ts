import { Request } from 'express';
import { Role } from './UserInterface';

export interface UserRequest extends Request {
  params: {
    id: string;
  };

  query: {
    search: string;
    limit: string;
    offset: string;
  };

  body: {
    username: string;
    password?: string;
    email: string;
    role: Role;
  };
}
