/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
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
  const onSubmit = handleSubmit(data => {
    setSearch(data.search);
  });

  return (
    <section className="data-table-section bg-white p-4">
      <header>
        <h3 className="h6 fw-bold mb-5">Transactions</h3>
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
        isSucceed={isSucceed}
        setIsSucceed={setIsSucceed}
        setTransaction={setTransaction}
        search={search}
        type={type}
      />
    </section>
  );
};

export default Transactions;
