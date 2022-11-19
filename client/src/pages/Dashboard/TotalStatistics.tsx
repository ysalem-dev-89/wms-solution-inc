import { CardGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { MdPointOfSale } from 'react-icons/md';
import { numberWithCommas } from '../../helpers/NumberHelpers';
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
                <div>
                  <BiPurchaseTagAlt className="stats-icon" />
                </div>
                <div>
                  <CardTitle tag="h5">Total Purchases</CardTitle>
                  <CardText>{numberWithCommas(totalPurchases)}$</CardText>
                </div>
              </CardBody>
            </Card>
            <Card className="total-sales bg-danger">
              <CardBody>
                <div>
                  <MdPointOfSale className="stats-icon" />
                </div>
                <div>
                  <CardTitle tag="h5">Total Sales</CardTitle>
                  <CardText>{numberWithCommas(totalSales)}$</CardText>
                </div>
              </CardBody>
            </Card>
            <Card className="total-revenues bg-blue">
              <CardBody>
                <div>
                  <BiPurchaseTagAlt className="stats-icon" />
                </div>
                <div>
                  <CardTitle tag="h5">Total Revenues</CardTitle>
                  <CardText>{numberWithCommas(totalRevenues)}$</CardText>
                </div>
              </CardBody>
            </Card>
          </CardGroup>
        </div>
      )}
    </>
  );
};

export default TotalStatistics;
