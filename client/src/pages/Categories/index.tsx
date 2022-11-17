import { Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { CategorySearch } from '../../interfaces/FormData';
import { CategoryTable } from '../../components/CategoryTable';
import CategoryInterface from '../../interfaces/CategoryInterface';
import CategoryModal from '../../components/CategoryModal';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { PageContext } from '../../contexts/PageContext';
import useAuth from '../../hooks/useAuth';

const Categories = () => {
  const { register, handleSubmit } = useForm<CategorySearch>();
  const [search, setSearch] = useState<string>('');

  const { auth } = useAuth();
  const { user } = auth;

  const onSubmit = handleSubmit(data => {
    setSearch(data.search);
  });

  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryInterface | null>(null);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  const { setPages } = useContext(PageContext);

  useEffect(() => {
    setPages([
      { title: 'Dashboard', link: '' },
      { title: 'Categories', link: 'categories' }
    ]);
  }, []);

  const handleAddClick = () => {
    setCategory(null);
    setModal(true);
  };

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
        {' '}
        <header>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <form onSubmit={onSubmit}>
              <div className="search-input">
                <GoSearch onClick={onSubmit} role="button" />
                <input
                  type="text"
                  {...register('search')}
                  className="p-2 border border-border outline-none rounded"
                  placeholder="Search"
                />
              </div>
            </form>
            <div className="right ms-auto">
              <div>
                {user?.role == 'superAdmin' ||
                user?.role == 'admin' ||
                user?.role == 'stock' ? (
                  <Button color="primary" onClick={_e => handleAddClick()}>
                    Add Category
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </header>
        <CategoryTable
          isPending={isPending}
          setIsPending={setIsPending}
          setCategory={setCategory}
          setModal={setModal}
          isSucceed={isSucceed}
          setIsSucceed={setIsSucceed}
          search={search}
        />
        <CategoryModal
          category={category}
          modal={modal}
          setModal={setModal}
          isSucceed={isSucceed}
          setIsSucceed={setIsSucceed}
        />
        <ToastContainer />
      </section>
    </>
  );
};

export default Categories;
