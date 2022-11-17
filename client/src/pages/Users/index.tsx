import { Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { CategorySearch } from '../../interfaces/FormData';
import { UserInterface } from '../../interfaces/UserInterface';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { PageContext } from '../../contexts/PageContext';
import { UserTable } from '../../components/UserTable';
import UserModal from '../../components/UserModal';

const Users = () => {
  const { register, handleSubmit } = useForm<CategorySearch>();
  const [search, setSearch] = useState<string>('');

  const onSubmit = handleSubmit(data => {
    setSearch(data.search);
  });

  const [modal, setModal] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const { setPages } = useContext(PageContext);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    setPages([
      { title: 'Dashboard', link: '' },
      { title: 'Users', link: 'users' }
    ]);
  }, []);

  const handleAddClick = () => {
    setUser(null);
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
                <Button color="primary" onClick={_e => handleAddClick()}>
                  Add User
                </Button>
              </div>
            </div>
          </div>
        </header>
        <UserTable
          isPending={isPending}
          setIsPending={setIsPending}
          setUser={setUser}
          setModal={setModal}
          isSucceed={isSucceed}
          setIsSucceed={setIsSucceed}
          search={search}
        />
        <UserModal
          user={user}
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

export default Users;
