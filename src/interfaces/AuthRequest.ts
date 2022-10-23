import { Request } from 'express';
import { Role } from './UserInterface';

export interface AuthRequest extends Request {
  user: {
    id: number;
    username: string;
    email: string;
    role: Role;
  };
}
