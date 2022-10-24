export enum TransactionStatus {
  Pending = 'pending',
  Reversed = 'reversed',
  Closed = 'closed'
}

export enum TransactionType {
  Purchase = 'purchase',
  Sale = 'sale'
}

export type Transaction = {
  id: number;
  status: TransactionStatus;
  type: TransactionType;
  issuedBy: number;
  createdAt: Date;
  updatedAt: Date;
};
