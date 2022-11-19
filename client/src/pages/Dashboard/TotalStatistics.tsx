import { CardGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './style.css';

const TotalStatistics = ({
  totalPurchases,
  totalSales,
  totalRevenues,
  error
}: {
  totalPurchases: number;
  totalSales: number;
  totalRevenues: number;
  error: string;
}) => {
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
