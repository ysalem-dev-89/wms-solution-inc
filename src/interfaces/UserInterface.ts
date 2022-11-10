export enum Role {
  admin = 'admin',
  customer = 'customer'
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
