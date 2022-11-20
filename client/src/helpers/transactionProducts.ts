import { TransactionStatus, TransactionType } from '../interfaces/Enums';
import { ProductInterface } from '../interfaces/ProductInterface';
import { TransactionProductInterface } from '../interfaces/TransactionProductInterface';

export const updateTransactionProducts = ({
  price,
  quantity,
  status,
  type,
  ProductId,
  currentTransactionProducts,
  Product
}: {
  price?: number;
  quantity: number;
  status?: TransactionStatus;
  type?: TransactionType;
  ProductId: number;
  Product: ProductInterface;
  currentTransactionProducts: TransactionProductInterface[];
}): TransactionProductInterface[] => {
  const quantityValue = quantity ? Number(quantity) : 1;
  const inStockValue = Product.inStock ? Product.inStock : 1;

  const transactionProducts =
    currentTransactionProducts &&
    currentTransactionProducts.map(item => {
      if (item.Product.id == ProductId) {
        const newItem = item;
        newItem.quantity =
          quantityValue > inStockValue && type == TransactionType.Sale
            ? inStockValue
            : quantityValue;
        newItem.unitPrice = price || newItem.unitPrice;
        newItem.status = status || newItem.status;
        return newItem;
      }
      return item;
    });

  if (quantityValue > inStockValue && type == TransactionType.Sale) {
    throw new Error(
      `We only have ${inStockValue} ${Product.unit} available of ${Product.title}`
    );
  }

  return transactionProducts;
};

export const addNewTransactionProduct = ({
  price,
  quantity,
  status,
  type,
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
  type?: TransactionType;
  ProductId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  Product: ProductInterface;
  currentTransactionProducts: TransactionProductInterface[];
}): TransactionProductInterface[] => {
  const quantityValue = quantity ? Number(quantity) : 1;
  const inStockValue = Product.inStock ? Product.inStock : 1;

  const transactionProducts = [
    ...(currentTransactionProducts || []),
    {
      TransactionId,
      quantity:
        quantityValue > inStockValue && type == TransactionType.Sale
          ? inStockValue
          : quantityValue,
      unitPrice: Number(price) || 0,
      status: status || TransactionStatus.Closed,
      ProductId: ProductId || -1,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      Product: Product
    }
  ];

  if (quantityValue > inStockValue && type == TransactionType.Sale) {
    throw new Error(
      `We only have ${inStockValue} ${Product.unit} available of ${Product.title}`
    );
  }
  return transactionProducts;
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
