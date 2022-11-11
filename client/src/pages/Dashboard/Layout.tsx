import { useContext } from 'react';
import { Spinner } from 'reactstrap';
import { LoadingContext } from '../../contexts/LoadingContext';
import RevenueChart from './RevenueChart';
import StockAlertTable from './StockAlertTable';
import TopSelling from './TopSelling';
import TotalStatistics from './TotalStatistics';

const Layout = () => {
  const { isLoading } = useContext(LoadingContext);
  const found = Object.values(isLoading).some(item => item);
  return (
    <>
      <div className={`loading-center ${found ? 'd-flex' : 'd-none'} gap-2`}>
        <Spinner color="primary" type="grow">
          Loading...
        </Spinner>
        <Spinner color="secondary" type="grow">
          Loading...
        </Spinner>
        <Spinner color="danger" type="grow">
          Loading...
        </Spinner>
      </div>
      <div className={`${found ? 'd-none' : 'd-block'}`}>
        <TotalStatistics />
        <RevenueChart />
        <TopSelling />
        <StockAlertTable />
      </div>
    </>
  );
};

export default Layout;
