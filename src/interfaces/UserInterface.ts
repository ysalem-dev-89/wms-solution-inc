export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum role {
  admin = 'admin',
  customer = 'customer'
}
