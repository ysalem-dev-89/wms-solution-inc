/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import TransactionInterface from '../../interfaces/TransactionInterface';
import { TransactionsTable } from '../../components/TransactionsTable';
import './style.css';
import { PageContext } from '../../contexts/PageContext';

const Transactions = () => {
  const navigate = useNavigate();

  const { setPages } = useContext(PageContext);

  useEffect(() => {
    setPages([
      { title: 'Dashboard', link: '' },
      { title: 'Transactions', link: 'transactions' }
    ]);
  }, []);

  const { register, handleSubmit } = useForm();
  const [type, setType] = useState<string>('all');

  const [search, setSearch] = useState<string>('');
  const [setTransaction] = useState<TransactionInterface | any>(null);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  const onSubmit = handleSubmit(data => {
    setSearch(data.search);
  });

  return (
    <>
      <div className={`spinner ${isPending ? 'd-flex gap-2' : 'd-none'}`}>
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
      <section
        className={`data-table-section bg-bg-light pt-2 ${
          isPending ? 'd-none' : 'd-block'
        }`}
      >
        <header>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <form onSubmit={onSubmit} className="flex-1">
              <div className="form-content d-flex gap-3">
                <div className="search-input">
                  <GoSearch />
                  <input
                    type="search"
                    {...register('search')}
                    className="p-2 border border-border outline-none rounded"
                    placeholder="Search for user"
                  />
                </div>
                <div className="right">
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setType('all')}
                      active={type === 'all'}
                    >
                      All
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setType('purchase')}
                      active={type === 'purchase'}
                    >
                      Purchase
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setType('sale')}
                      active={type === 'sale'}
                    >
                      Sale
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </form>
            <div className="right">
              <div>
                <Button
                  color="primary"
                  onClick={() => {
                    navigate('add');
                  }}
                >
                  Add Transaction
                </Button>
              </div>
            </div>
          </div>
        </header>
        <TransactionsTable
          isPending={isPending}
          setIsPending={setIsPending}
          isSucceed={isSucceed}
          setIsSucceed={setIsSucceed}
          setTransaction={setTransaction}
          search={search}
          type={type}
        />
      </section>
    </>
  );
};

export default Transactions;
