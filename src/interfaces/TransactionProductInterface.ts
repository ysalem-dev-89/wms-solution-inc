export default interface TransactionProduct {
  productId: number;
  transactionId: number;
  status: string;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
