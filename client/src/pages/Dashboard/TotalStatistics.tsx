import { CardGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './style.css';
import { useState, useEffect } from 'react';
import * as analyticsApi from '../../api/analytics';
import { AxiosError } from 'axios';
import ErrorHandler from '../../helpers/ErrorHandler';
import Loader from './Loader';

const TotalStatistics = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalRevenues, setTotalRevenues] = useState<number>(0);

  const displayTotalStatistics = async () => {
    try {
      setIsLoading(true);
      const { data } = await analyticsApi.totalStatistics();
      if (data) {
        const { totalpurchases, totalsales, totalrevenues } =
          data.totalStatistics;
        setTotalPurchases(totalpurchases);
        setTotalSales(totalsales);
        setTotalRevenues(totalrevenues.toFixed(1));
        setIsLoading(false);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    displayTotalStatistics();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div className="total-statistics">
          <CardGroup>
            <Card className="total-purchases">
              <CardBody>
                <CardTitle tag="h5">Total Purchases</CardTitle>
                <CardText>{totalPurchases}$</CardText>
              </CardBody>
            </Card>
            <Card className="total-sales">
              <CardBody>
                <CardTitle tag="h5">Total Sales</CardTitle>
                <CardText>{totalSales}$</CardText>
              </CardBody>
            </Card>
            <Card className="total-revenues">
              <CardBody>
                <CardTitle tag="h5">Total Revenues</CardTitle>
                <CardText>{totalRevenues}$</CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </div>
      )}
    </>
  );
};

export default TotalStatistics;
