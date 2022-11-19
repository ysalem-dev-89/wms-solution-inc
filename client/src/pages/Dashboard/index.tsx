import './style.css';
import { useState, useEffect } from 'react';
import TotalStatistics from './TotalStatistics';
import RevenueChart from './RevenueChart';
import TopSelling from './TopSelling';
import OutOfStockAlert from './OutOfStockAlertTable';
import { IStockAlert } from '../../interfaces/AnalyticsInterface';
import ErrorHandler from '../../helpers/ErrorHandler';
import { AxiosError } from 'axios';
import axios from 'axios';
import {
  totalStatistics,
  monthlyRevenue,
  topSelling,
  stockAlert
} from '../../api/analytics';
import Loader from './Loader';

const Dashboard = () => {
  const LAUNCHED_YEAR = 2018;
  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS_COUNT = CURRENT_YEAR - (LAUNCHED_YEAR - 1);
  const years = [...Array(YEARS_COUNT)].map((_, i) => CURRENT_YEAR - i);

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalRevenues, setTotalRevenues] = useState<number>(0);
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [purchases, setPurchases] = useState<number[]>([]);
  const [sales, setSales] = useState<number[]>([]);
  const [revenues, setRevenues] = useState<number[]>([]);
  const [topSellingNames, setTopSellingNames] = useState<string[]>([]);
  const [topSellingNums, setTopSellingNums] = useState<number[]>([]);
  const [outofstockData, setOutofstockData] = useState<IStockAlert[]>([]);
  const [alert, setAlert] = useState<string>('all');

  const fetchAnalyticsData = async () => {
    try {
      const requests = [
        totalStatistics(),
        monthlyRevenue(year),
        topSelling(),
        stockAlert()
      ];
      const responses = await axios.all(requests);
      responses && setIsLoading(false);

      const { totalpurchases, totalsales, totalrevenues } =
        responses[0].data.totalStatistics;
      setTotalPurchases(totalpurchases);
      setTotalSales(totalsales);
      setTotalRevenues(totalrevenues.toFixed(1));

      const { purchases, sales, revenues } = responses[1].data;
      setPurchases(purchases);
      setSales(sales);
      setRevenues(revenues);

      const { products, salesCount } = responses[2].data;
      setTopSellingNames(products);
      setTopSellingNums(salesCount);

      const { inStock } = responses[3].data;
      setOutofstockData(inStock);
      const filterByAlert = (arr: IStockAlert[], min: number, max: number) => {
        return arr.filter(obj => +obj.instock >= min && +obj.instock < max);
      };
      alert === 'all'
        ? setOutofstockData(inStock)
        : alert === 'earlyAlert'
        ? setOutofstockData(filterByAlert(inStock, 250, 500))
        : alert === 'unhurriedAlert'
        ? setOutofstockData(filterByAlert(inStock, 100, 250))
        : alert === 'urgentAlert'
        ? setOutofstockData(filterByAlert(inStock, 0, 100))
        : '';
    } catch (error) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [year, alert]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <TotalStatistics
        totalPurchases={totalPurchases}
        totalSales={totalSales}
        totalRevenues={totalRevenues}
        error={error}
      />
      <RevenueChart
        purchases={purchases}
        sales={sales}
        revenues={revenues}
        year={year}
        setYear={setYear}
        years={years}
        error={error}
      />
      <TopSelling
        topSellingNames={topSellingNames}
        topSellingNums={topSellingNums}
        error={error}
      />
      <OutOfStockAlert
        outofstockData={outofstockData}
        alert={alert}
        setAlert={setAlert}
        error={error}
      />
    </>
  );
};

export default Dashboard;
