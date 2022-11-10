import './style.css';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as analyticsApi from '../../api/analytics';
import { AxiosError } from 'axios';
import ErrorHandler from '../../helpers/ErrorHandler';
import YearSelector from './YearSelector';
import Loader from './Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const LAUNCHED_YEAR = 2018;
  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS_COUNT = CURRENT_YEAR - (LAUNCHED_YEAR - 1);
  const years = [...Array(YEARS_COUNT)].map((_, i) => CURRENT_YEAR - i);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [purchases, setPurchases] = useState<number[]>([]);
  const [sales, setSales] = useState<number[]>([]);
  const [revenues, setRevenues] = useState<number[]>([]);

  const displayRevenueChart = async () => {
    try {
      setIsLoading(true);
      const { data } = await analyticsApi.monthlyRevenue(year);
      if (data) {
        setIsLoading(false);
        setPurchases(data.purchases);
        setSales(data.sales);
        setRevenues(data.revenues);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    displayRevenueChart();
  }, [year]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Monthly Revenue Chart'
      }
    }
  };

  const labels = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenues,
        backgroundColor: 'rgba(224, 180, 47, 0.7)'
      },
      {
        label: 'Purchases',
        data: purchases,
        backgroundColor: 'rgb(255, 99, 132, .7)'
      },
      {
        label: 'Sales',
        data: sales,
        backgroundColor: 'rgba(53, 235, 108, 0.6)'
      }
    ]
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div className="chart">
          <YearSelector year={year} years={years} setYear={setYear} />
          <Bar options={options} data={chartData} />
        </div>
      )}
    </>
  );
};

export default RevenueChart;
