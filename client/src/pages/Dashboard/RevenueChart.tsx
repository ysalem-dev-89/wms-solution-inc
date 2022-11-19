import './style.css';
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
import YearSelector from './YearSelector';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({
  purchases,
  sales,
  revenues,
  year,
  setYear,
  years,
  error
}: {
  purchases: number[];
  sales: number[];
  revenues: number[];
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  years: number[];
  error: string;
}) => {
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
        backgroundColor: '#ff6384'
      },
      {
        label: 'Purchases',
        data: purchases,
        backgroundColor: '#36a2eb'
      },
      {
        label: 'Sales',
        data: sales,
        backgroundColor: '#ffce56'
      }
    ]
  };

  return (
    <>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div className="chart">
          <YearSelector year={year} years={years} setYear={setYear} />
          <Bar className="char-bar" options={options} data={chartData} />
        </div>
      )}
    </>
  );
};

export default RevenueChart;
