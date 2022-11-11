export enum TransactionType {
  Purchase = 'purchase',
  Sale = 'sale'
}

export enum TransactionStatus {
  Pending = 'pending',
  Closed = 'closed',
  Reversed = 'reversed'
}

export enum ApiStatus {
  Loading = 'loading',
  Success = 'Success',
  Failed = 'failed'
}

export enum UserMessages {
  FetchFailed = 'Failed getting data',
  EmptyData = 'There is no data to show'
}

export enum Role {
  admin = 'admin',
  transactions = 'transactions',
  stock = 'stock'
}
