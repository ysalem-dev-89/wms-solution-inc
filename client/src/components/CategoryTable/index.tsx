import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineEye } from 'react-icons/hi';
import { AxiosError } from 'axios';
import CategoryInterface from '../../interfaces/CategoryInterface';
import * as Category from '../../api/category';
import { TablePagination } from '../TablePagination';
import ErrorHandler from '../../helpers/ErrorHandler';
import './style.css';

export const CategoryTable = (props: {
  setCategory: React.Dispatch<React.SetStateAction<CategoryInterface | null>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSucceed: boolean;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
}) => {
  const [categories, setCategories] = useState<Array<CategoryInterface> | null>(
    null
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleView = (id: number, name: string) => {
    props.setCategory({
      id,
      name,
      productsCount: 0
    });

    props.setModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        const list = await Category.search({
          name: props.search,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1)
        });

        setIsPending(false);
        setCategories(list.data.items);
        setTotalItems(list.data.totalCount);
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);

        setIsPending(false);
      }
    };

    fetchData();
    props.setIsSucceed(false);
  }, [currentPage, props.isSucceed, props.search]);

  const handleRemove = async (id: number) => {
    try {
      await Category.remove(id);

      props.setIsSucceed(true);
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  };

  return (
    <div className="data-table">
      <Table responsive bordered primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>Category Name</th>
            <th>Product Count</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : !categories ? (
            <div>No Categories Found</div>
          ) : (
            categories.map(category => {
              return (
                <tr key={category.id}>
                  <td className="category-name">{category.name}</td>
                  <td className="product-count">{category?.productsCount}</td>
                  <td className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                    <button
                      onClick={e => {
                        handleView(category.id, category.name);
                      }}
                    >
                      <HiOutlineEye className="text-blue" /> View
                    </button>
                    <button
                      onClick={e => {
                        handleRemove(category.id);
                      }}
                    >
                      <TfiClose className="text-danger" /> Remove
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <TablePagination
        pagesCount={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
