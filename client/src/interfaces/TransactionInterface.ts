import { TransactionType } from './Enums';
import { UserInterface } from './UserInterface';

export default interface TransactionInterface {
  id: number;
  type: TransactionType;
  createdAt: Date | null;
  updatedAt: Date | null;
  productsCount: number;
  totalCost: number;
  username: string;
  User?: UserInterface;
}
