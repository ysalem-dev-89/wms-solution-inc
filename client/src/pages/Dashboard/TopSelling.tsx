import './style.css';
import { useState, useEffect } from 'react';
import * as analyticsApi from '../../api/analytics';
import { AxiosError } from 'axios';
import ErrorHandler from '../../helpers/ErrorHandler';
import Loader from './Loader';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TopSelling = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [topSellingNames, setTopSellingNames] = useState<number[]>([]);
  const [topSellingNums, setTopSellingNums] = useState<number[]>([]);

  const displayTopSellingPie = async () => {
    try {
      setIsLoading(true);
      const { data } = await analyticsApi.topSelling();
      if (data) {
        const { products, sales } = data;
        setTopSellingNames(products);
        setTopSellingNums(sales);
        setIsLoading(false);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setIsLoading(false);
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
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <Pie className="top-selling" width="50" height="50" data={pieData} />
      )}
    </>
  );
};

export default TopSelling;
