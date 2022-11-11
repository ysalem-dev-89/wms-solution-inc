import './style.css';
import { useState, useEffect, useContext } from 'react';
import * as analyticsApi from '../../api/analytics';
import { AxiosError } from 'axios';
import ErrorHandler from '../../helpers/ErrorHandler';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LoadingContext } from '../../contexts/LoadingContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const TopSelling = () => {
  const [error, setError] = useState<string>('');
  const [topSellingNames, setTopSellingNames] = useState<number[]>([]);
  const [topSellingNums, setTopSellingNums] = useState<number[]>([]);
  const { setLoadingValue } = useContext(LoadingContext);

  const displayTopSellingPie = async () => {
    setLoadingValue(2, true);
    try {
      const { data } = await analyticsApi.topSelling();
      if (data) {
        const { products, sales } = data;
        setTopSellingNames(products);
        setTopSellingNums(sales);
        setLoadingValue(2, false);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setLoadingValue(2, false);
    }
  };

  useEffect(() => {
    displayTopSellingPie();
  }, []);

  const pieData = {
    labels: topSellingNames,
    datasets: [
      {
        label: 'Top Selling Products',
        data: topSellingNums,
        backgroundColor: [
          'rgb(255, 99, 132, .7)',
          'rgb(54, 162, 235, .7)',
          'rgb(255, 205, 86, .7)',
          'rgba(53, 235, 108, .7)',
          'rgba(153, 102, 255, .7)'
        ],
        borderColor: [
          'rgb(255, 99, 132, 1)',
          'rgb(54, 162, 235, 1)',
          'rgb(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  };
  return (
    <>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div>
          <h3 className="chart-title">Top Selling Products</h3>
          <Pie className="top-selling" data={pieData} />
        </div>
      )}
    </>
  );
};

export default TopSelling;
