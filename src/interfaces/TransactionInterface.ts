export enum TransactionStatus {
  Pending = 'pending',
  Reversed = 'reversed',
  Closed = 'closed'
}

export enum TransactionType {
  Purchase = 'purchase',
  Sale = 'sale'
}

export interface Transaction {
  id: number;
  type: TransactionType;
  issuedBy: number;
  createdAt: Date;
  updatedAt: Date;
}
