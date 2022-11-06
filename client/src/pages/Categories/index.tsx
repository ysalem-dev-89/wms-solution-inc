import { Button } from 'reactstrap';
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

const Categories = () => {
  const { register, handleSubmit } = useForm<CategorySearch>();
  const [search, setSearch] = useState<string>('');

  const onSubmit = handleSubmit(data => {
    setSearch(data.search);
  });

  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryInterface | null>(null);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);

  const { setPages } = useContext(PageContext);

  useEffect(() => {
    setPages([{ title: 'Categories', link: 'categories' }]);
  }, []);

  const handleAddClick = () => {
    setCategory(null);
    setModal(true);
  };

  return (
    <section className="data-table-section bg-white p-4">
      <header>
        <h3 className="h6 fw-bold mb-5">Categories</h3>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <form onSubmit={onSubmit}>
            <div className="search-input">
              <GoSearch />
              <input
                type="search"
                {...register('search')}
                className="p-2 border border-border outline-none rounded"
                placeholder="Search"
              />
            </div>
          </form>
          <div className="right ms-auto">
            <div>
              <Button color="primary" onClick={_e => handleAddClick()}>
                Add Category
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CategoryTable
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
  );
};

export default Categories;
