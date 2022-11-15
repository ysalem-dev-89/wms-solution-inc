import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineEye } from 'react-icons/hi';
import { AxiosError } from 'axios';
import { TablePagination } from '../TablePagination';
import ErrorHandler from '../../helpers/ErrorHandler';
import TransactionInterface from '../../interfaces/TransactionInterface';
import * as Transaction from '../../api/transaction';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

export const TransactionsTable = (props: {
  setTransaction: React.Dispatch<
    React.SetStateAction<TransactionInterface | null>
  >;
  isSucceed: boolean;
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  type: string;
}) => {
  const [transactions, setTransactions] =
    useState<Array<TransactionInterface> | null>(null);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props.isPending);
        const list = await Transaction.getTransactions({
          type: props.type,
          search: props.search,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1)
        });

        props.setIsPending(false);
        setTransactions(list.data.items);
        setNumOfPages(Math.ceil(list.data.totalCount / itemsPerPage));
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);

        props.setIsPending(false);
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

      toast.warning('Transaction is deleted successfully', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
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
          {error ? (
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
                    <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-1">
                      <button
                        onClick={_e => {
                          navigate(`${transaction.id}`);
                        }}
                      >
                        <HiOutlineEye className="text-blue" /> View
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
