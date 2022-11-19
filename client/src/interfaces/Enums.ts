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
  superAdmin = 'superAdmin',
  admin = 'admin',
  transactions = 'transactions',
  stock = 'stock'
}

export enum Unit {
  kg = 'kg',
  pocket = 'pocket',
  bag = 'bag',
  piece = 'piece',
  slice = 'slice',
  gram = 'gram',
  dozen = 'dozen',
  cm = 'cm',
  meter = 'meter'
}
