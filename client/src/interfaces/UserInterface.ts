import { Role } from './Enums';

export interface UserInterface {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  transactionsCount?: number;
}
