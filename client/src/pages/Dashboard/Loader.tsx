import './style.css';
import { Spinner } from 'reactstrap';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className={`loading-center ${isLoading ? 'd-flex' : 'd-none'} gap-2`}>
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
      <Spinner color="secondary" type="grow">
        Loading...
      </Spinner>
      <Spinner color="danger" type="grow">
        Loading...
      </Spinner>
    </div>
  );
};

export default Loader;
