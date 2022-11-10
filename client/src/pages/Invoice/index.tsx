import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AxiosError } from 'axios';
import TransactionInterface from '../../interfaces/TransactionInterface';
import { TransactionProductInterface } from '../../interfaces/TransactionProductInterface';
import * as Transaction from '../../api/transaction';
import ErrorHandler from '../../helpers/ErrorHandler';
import { capitalizeFirstLetter } from '../../helpers/StringHelpers';
import { PageContext } from '../../contexts/PageContext';
import { calculateTotalPrice } from '../../helpers/NumberHelpers';
import './style.css';

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<TransactionInterface | null>(
    null
  );
  const { setPages } = useContext(PageContext);

  const [transactionProducts, setTransactionProducts] = useState<
    TransactionProductInterface[]
  >([]);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await Transaction.getOneTransaction({ id: Number(id) });
        setTransaction(list.data.transaction.transaction);
        setTransactionProducts(list.data?.transaction?.transactionProducts);
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPages([
      { title: 'Transactions', link: 'transactions' },
      transaction
        ? {
            title: `${transaction?.type} #${transaction?.id}`,
            link: `transactions/edit/${transaction?.id}`
          }
        : {
            title: `#`,
            link: `transactions/`
          },
      { title: 'Invoice', link: `transactions/edit/${transaction?.id}/invoice` }
    ]);
  }, [transaction]);

  return (
    <section className="data-table-section bg-white p-4 transaction-details">
      {error ? (
        <div className="text-danger text-center display">{error}</div>
      ) : (
        <div className="card-body">
          <div className="container-fluid">
            <h3 className="text-center my-5">
              {capitalizeFirstLetter(transaction?.type?.toString())} Invoice
              #&nbsp;
              {transaction?.id}
            </h3>
            <hr />
          </div>
          <div className="container-fluid d-flex justify-content-between">
            <div className="col-lg-6 ps-0">
              <div className="mb-2">
                <p>
                  <b className="fs-5">{transaction?.User?.username}</b>
                </p>
              </div>
            </div>
            <div className="col-lg-3 pr-0">
              <p className="text-right">
                <p>
                  <b>Invoice Date: </b>
                  {moment(transaction?.createdAt).format('DD/MM/YYYY')}
                </p>
                <p>
                  <b>Due Date: </b>
                  {moment().format('DD/MM/YYYY')}
                </p>
              </p>
            </div>
          </div>
          <div className="container-fluid d-flex justify-content-between"></div>
          <div className="container-fluid mt-5 d-flex justify-content-center w-100">
            <div className="table-responsive w-100">
              <table className="table">
                <thead>
                  <tr className="bg-dark text-white">
                    <th>#</th>
                    <th>Product title</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Unit price</th>
                    <th className="text-right">Discount</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionProducts.map(item => (
                    <tr key={item.id} className="text-right">
                      <td className="text-left">{item.id}</td>
                      <td className="text-left">{item.Product.title}</td>
                      <td>{item.quantity}</td>
                      <td>${item.unitPrice}</td>
                      <td>${(item.Product.discount * 100).toFixed(2)}%</td>
                      <td>
                        $
                        {calculateTotalPrice({
                          price: item.unitPrice,
                          quantity: item.quantity,
                          discount: item.Product.discount
                        }).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="container-fluid mt-5 w-100">
            <h4 className="text-right mb-5 text-end">
              Total : $
              {transactionProducts
                ?.reduce(
                  (acc, item) =>
                    acc +
                    calculateTotalPrice({
                      price: item?.unitPrice || 0,
                      quantity: item?.quantity || 1,
                      discount: item?.Product.discount || 0
                    }),
                  0
                )
                .toFixed(2)}
            </h4>
            <hr />
          </div>
          <div className="container-fluid w-100 d-flex justify-content-end">
            <a
              href="#"
              className="btn btn-danger float-right mt-4 ms-2 text-white"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ti-printer me-1"></i>Back
            </a>
            <a
              href="#"
              className="btn btn-primary float-right mt-4 ms-2"
              onClick={() => {
                window.print();
              }}
            >
              <i className="ti-printer me-1"></i>Print
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Invoice;
