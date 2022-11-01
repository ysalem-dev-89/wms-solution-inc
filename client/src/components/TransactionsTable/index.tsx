import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { TfiClose } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { AxiosError } from 'axios';
import { TablePagination } from '../TablePagination';
import ErrorHandler from '../../helpers/ErrorHandler';
import TransactionInterface from '../../interfaces/TransactionInterface';
import * as Transaction from '../../api/transaction';
import './style.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const TransactionsTable = (props: {
  setTransaction: React.Dispatch<
    React.SetStateAction<TransactionInterface | null>
  >;
  isSucceed: boolean;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  type: string;
}) => {
  const [transactions, setTransactions] =
    useState<Array<TransactionInterface> | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        const list = await Transaction.getTransactions({
          type: props.type,
          search: props.search,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1)
        });

        setIsPending(false);
        setTransactions(list.data.items);
        setNumOfPages(Math.ceil(list.data.totalCount / itemsPerPage));
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);

        setIsPending(false);
      }
    };

    fetchData();
    props.setIsSucceed(false);
  }, [currentPage, props.isSucceed, props.search, props.type]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.search, props.type]);

  const handleRemove = async (id: number) => {
    try {
      await Transaction.deleteOneTransaction(id);
      props.setIsSucceed(true);
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  };

  return (
    <div className="data-table">
      <Table responsive primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>#</th>
            <th>Transaction Type</th>
            <th>Transaction Date</th>
            <th>Issued By</th>
            <th>Products</th>
            <th>Total Price</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : !transactions ? (
            <div>No Transactions Found</div>
          ) : (
            transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.type}</td>
                  <td>{moment(transaction?.createdAt).format('DD/MM/YYYY')}</td>
                  <td>{transaction['username']}</td>
                  <td>{transaction.productsCount}</td>
                  <td>${Number(transaction.totalCost).toFixed(2)}</td>
                  <td>
                    <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                      <button
                        onClick={e => {
                          navigate(`edit/${transaction.id}`);
                        }}
                      >
                        <FiEdit2 className="text-blue" /> Edit
                      </button>
                      <button
                        onClick={_e => {
                          handleRemove(transaction.id);
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
      <TablePagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
