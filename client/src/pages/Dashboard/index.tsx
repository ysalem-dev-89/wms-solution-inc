import './style.css';
import TotalStatistics from './TotalStatistics';
import RevenueChart from './RevenueChart';
import TopSelling from './TopSelling';
import StockAlertTable from './StockAlertTable';

const Dashboard = () => {
  return (
    <>
      <TotalStatistics />
      {/* <div className="d-flex align-items-center gap-2"> */}
      <RevenueChart />
      <TopSelling />
      {/* </div> */}
      <StockAlertTable />
    </>
  );
};

export default Dashboard;
