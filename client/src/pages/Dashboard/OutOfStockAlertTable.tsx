/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css';
import { Table } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import { AiFillHourglass } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { IStockAlert } from '../../interfaces/AnalyticsInterface';
import { TablePagination } from '../../components/TablePagination';
import { useState, useContext } from 'react';
import { UrgentContext } from '../../contexts/UrgentContext';

const StockAlertTable = ({
  outofstockData,
  alert,
  setAlert,
  error
}: {
  outofstockData: IStockAlert[];
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
  error: string;
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const start = Number(currentPage - 1 + '0');
  const end = Number(currentPage - 1 + '9');
  const { setUrgent } = useContext(UrgentContext);

  return (
    <>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <>
          <ButtonGroup>
            <Button
              color="primary"
              outline
              onClick={() => setAlert('all')}
              active={alert === 'all'}
            >
              All
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setAlert('earlyAlert')}
              active={alert === 'earlyAlert'}
            >
              Early Alert
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setAlert('unhurriedAlert')}
              active={alert === 'unhurriedAlert'}
            >
              Unhurried Alert
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setAlert('urgentAlert')}
              active={alert === 'urgentAlert'}
            >
              Urgent Alert
            </Button>
            <caption className="px-5">
              <h3 className="chart-title">Out of Stock Alert Table</h3>
            </caption>
          </ButtonGroup>

          <Table hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>In Stock</th>
                <th>New Order!</th>
              </tr>
            </thead>

            {outofstockData.slice(start, end).map((item, i) => (
              <tbody key={item.productid}>
                <tr>
                  {/* <th scope="row">{item.productid}</th> */}
                  <th scope="row">{i + 1}</th>
                  <td>{item.product}</td>
                  <td>{+item.instock}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setUrgent([item]);
                        navigate(`/transactions/add`);
                      }}
                    >
                      <AiFillHourglass className="text-blue" /> ORDER
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      )}
      <TablePagination
        numOfPages={Math.ceil(outofstockData.length / 10)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default StockAlertTable;
