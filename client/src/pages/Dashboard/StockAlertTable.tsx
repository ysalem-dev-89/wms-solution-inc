/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css';
import { useState, useEffect, useContext } from 'react';
import * as analyticsApi from '../../api/analytics';
import { AxiosError } from 'axios';
import ErrorHandler from '../../helpers/ErrorHandler';
import { Table } from 'reactstrap';
import { TablePagination } from '../../components/TablePagination';
import { LoadingContext } from '../../contexts/LoadingContext';

const StockAlertTable = () => {
  const [error, setError] = useState<string>('');
  const [stockAlert, setStockAlert] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(77);
  const { setLoadingValue } = useContext(LoadingContext);

  const displayStockAlertTable = async () => {
    try {
      // setLoadingValue(3, true);
      const offset = limit * (currentPage - 1);
      const { data } = await analyticsApi.stockAlert({
        limit,
        offset
      });
      if (data) {
        const { inStock } = data;
        setStockAlert(inStock);
        setTotalItems(77);
        // setLoadingValue(3, false);
      }
    } catch (error: any) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setLoadingValue(3, false);
    }
  };

  useEffect(() => {
    displayStockAlertTable();
  }, [currentPage]);

  return (
    <>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <Table hover>
          <caption>
            <h3 className="chart-title">Stock Alert Table</h3>
          </caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>In Stock</th>
            </tr>
          </thead>
          {stockAlert.map((item, i) => (
            <tbody key={i + 1}>
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{item.product}</td>
                <td>{+item.instock}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}
      <TablePagination
        numOfPages={Math.ceil(totalItems / limit)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default StockAlertTable;
