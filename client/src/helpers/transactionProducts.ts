import { TransactionStatus } from '../interfaces/Enums';
import { ProductInterface } from '../interfaces/ProductInterface';
import { TransactionProductInterface } from '../interfaces/TransactionProductInterface';

export const updateTransactionProducts = ({
  price,
  quantity,
  status,
  ProductId,
  currentTransactionProducts
}: {
  price?: number;
  quantity: number;
  status?: TransactionStatus;
  ProductId: number;
  currentTransactionProducts: TransactionProductInterface[];
}): TransactionProductInterface[] => {
  return (
    currentTransactionProducts &&
    currentTransactionProducts.map(item => {
      if (item.Product.id == ProductId) {
        const newItem = item;
        newItem.quantity = quantity >= 1 ? Number(quantity) : 1;
        newItem.unitPrice = price || newItem.unitPrice;
        newItem.status = status || newItem.status;
        return newItem;
      }
      return item;
    })
  );
};

export const addNewTransactionProduct = ({
  price,
  quantity,
  status,
  ProductId,
  createdAt,
  updatedAt,
  TransactionId,
  Product,
  currentTransactionProducts
}: {
  TransactionId: number;
  price?: number;
  quantity?: number;
  status?: TransactionStatus;
  ProductId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  Product: ProductInterface;
  currentTransactionProducts: TransactionProductInterface[];
}): TransactionProductInterface[] => {
  return [
    ...(currentTransactionProducts || []),
    {
      TransactionId,
      quantity: Number(quantity) || 1,
      unitPrice: Number(price) || 0,
      status: status || TransactionStatus.Pending,
      ProductId: ProductId || -1,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      Product: Product
    }
  ];
};

export const deleteTransactionProducts = ({
  ProductId,
  currentTransactionProducts
}: {
  ProductId: number;
  currentTransactionProducts: TransactionProductInterface[];
}): TransactionProductInterface[] => {
  return currentTransactionProducts.filter(
    item => item.Product.id !== ProductId
  );
};
