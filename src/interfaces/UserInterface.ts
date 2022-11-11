export enum Role {
  admin = 'admin',
  transactions = 'transactions',
  stock = 'stock'
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
