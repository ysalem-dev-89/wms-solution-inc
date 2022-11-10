import { useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { TfiClose } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { TransactionProductInterface } from '../../interfaces/TransactionProductInterface';
import {
  updateTransactionProducts,
  deleteTransactionProducts
} from '../../helpers/transactionProducts';
import './style.css';
import { calculateTotalPrice } from '../../helpers/NumberHelpers';

export const TransactionProductsTable = (props: {
  transactionId: number;
  transactionProduct: TransactionProductInterface | null;
  setTransactionProduct: React.Dispatch<
    React.SetStateAction<TransactionProductInterface | null>
  >;
  operation: string;
  transactionProducts: TransactionProductInterface[] | null;
  setTransactionProducts: React.Dispatch<
    React.SetStateAction<TransactionProductInterface[]>
  >;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error] = useState<string>('');
  const { register } = useForm();

  const changeQuantityValue = (
    ProductId: number,
    quantity: number,
    transactionProducts: TransactionProductInterface[]
  ) => {
    const updated = updateTransactionProducts({
      currentTransactionProducts: transactionProducts,
      ProductId: ProductId,
      quantity: quantity
    });

    props.setTransactionProducts(updated);
  };

  const handleEdit = (transactionProduct: TransactionProductInterface) => {
    props.setTransactionProduct(transactionProduct);
    props.setModal(true);
  };

  const handleRemove = (transactionProduct: TransactionProductInterface) => {
    props.setTransactionProducts(
      deleteTransactionProducts({
        ProductId: transactionProduct.Product.id || -1,
        currentTransactionProducts: props.transactionProducts || []
      })
    );
  };

  return (
    <div className="data-table">
      <Table responsive primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>#</th>
            <th>Product title</th>
            <th>Status</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Total Price</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <div className="text-danger">{error}</div>
          ) : !props.transactionProducts?.length ? (
            <div>
              {props.operation === 'add' ? '' : 'No Transactions Found'}
            </div>
          ) : (
            props.transactionProducts?.map(transactionProduct => {
              return (
                <tr key={transactionProduct.ProductId}>
                  <td>{transactionProduct.id}</td>
                  <td>{transactionProduct.Product.title}</td>
                  <td>{transactionProduct.status}</td>
                  <td>${transactionProduct.unitPrice.toFixed(2)}</td>
                  <td>
                    <div className="quantity-content d-flex justify-content-center align-items-center">
                      <Button
                        color="primary"
                        onClick={_e => {
                          changeQuantityValue(
                            transactionProduct.Product.id || -1,
                            Number(transactionProduct.quantity) - 1,
                            props.transactionProducts || []
                          );
                        }}
                      >
                        -
                      </Button>
                      <input
                        type="text"
                        name="quantity"
                        {...register}
                        className="quantity-input form-control"
                        value={transactionProduct.quantity}
                        onChange={e => {
                          changeQuantityValue(
                            transactionProduct.Product.id || -1,
                            Number(e.target.value),
                            props.transactionProducts || []
                          );
                        }}
                      />

                      <Button
                        color="primary"
                        onClick={_e => {
                          changeQuantityValue(
                            transactionProduct.Product.id || -1,
                            Number(transactionProduct.quantity) + 1,
                            props.transactionProducts || []
                          );
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>
                    {(transactionProduct.Product.discount * 100.0).toFixed(2)}%
                  </td>
                  <td>
                    $
                    {calculateTotalPrice({
                      price: transactionProduct.unitPrice,
                      quantity: transactionProduct.quantity,
                      discount: transactionProduct.Product.discount
                    }).toFixed(2)}
                  </td>
                  <td>
                    <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                      <button onClick={_e => handleEdit(transactionProduct)}>
                        <FiEdit2 className="text-blue" /> Edit
                      </button>
                      <button
                        onClick={_e => {
                          handleRemove(transactionProduct);
                        }}
                      >
                        <TfiClose className="text-danger" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};
