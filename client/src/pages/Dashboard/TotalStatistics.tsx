import { CardGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './style.css';
import { useState, useEffect, useContext } from 'react';
import * as analyticsApi from '../../api/analytics';
import { AxiosError } from 'axios';
import ErrorHandler from '../../helpers/ErrorHandler';
import { LoadingContext } from '../../contexts/LoadingContext';

const TotalStatistics = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalRevenues, setTotalRevenues] = useState<number>(0);
  const { setLoadingValue } = useContext(LoadingContext);

  const displayTotalStatistics = async () => {
    try {
      setLoadingValue(0, true);
      const { data } = await analyticsApi.totalStatistics();
      if (data) {
        const { totalpurchases, totalsales, totalrevenues } =
          data.totalStatistics;
        setTotalPurchases(totalpurchases);
        setTotalSales(totalsales);
        setTotalRevenues(totalrevenues.toFixed(1));
        setLoadingValue(0, false);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
      setLoadingValue(0, false);
    }
  };

  useEffect(() => {
    displayTotalStatistics();
  }, []);

  return (
    <>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div className="total-statistics">
          <CardGroup>
            <Card className="total-purchases bg-primary">
              <CardBody>
                <CardTitle tag="h5">Total Purchases</CardTitle>
                <CardText>{totalPurchases}$</CardText>
              </CardBody>
            </Card>
            <Card className="total-sales bg-danger">
              <CardBody>
                <CardTitle tag="h5">Total Sales</CardTitle>
                <CardText>{totalSales}$</CardText>
              </CardBody>
            </Card>
            <Card className="total-revenues bg-blue">
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
