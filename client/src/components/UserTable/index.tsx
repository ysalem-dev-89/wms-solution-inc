import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { TfiClose } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { AxiosError } from 'axios';
import * as User from '../../api/user';
import { TablePagination } from '../TablePagination';
import ErrorHandler from '../../helpers/ErrorHandler';
import './style.css';
import { UserInterface } from '../../interfaces/UserInterface';
import { Role } from '../../interfaces/Enums';
import { toast } from 'react-toastify';

export const UserTable = (props: {
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSucceed: boolean;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
}) => {
  const [users, setUsers] = useState<Array<UserInterface> | null>(null);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isPagingLoading, setIsPagingLoading] = useState<boolean>(false);

  const handleView = ({
    id,
    username,
    email,
    password,
    role
  }: {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
  }) => {
    props.setUser({
      id,
      username,
      email,
      password,
      role
    });

    props.setModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsPagingLoading(true);

      try {
        const list = await User.getUsers({
          search: props.search,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1)
        });

        setIsPagingLoading(false);
        props.setIsPending(false);

        setUsers(list.data.items);
        setNumOfPages(Math.ceil(list.data.totalCount / itemsPerPage));
        setTotalCount(list.data.totalCount);
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);

        setIsPagingLoading(false);
        props.setIsPending(false);
      }
    };

    fetchData();
    props.setIsSucceed(false);
  }, [currentPage, props.isSucceed, props.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.search]);

  const handleRemove = async (id: number) => {
    try {
      await User.deleteOneUser(id);
      props.setIsSucceed(true);

      toast.warning('User is deleted successfully', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error: unknown) {
      const exception = error as AxiosError;
      const data = exception?.response?.data as {
        statusCode: number;
        error: string;
      };
      toast.error(data?.error || '', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  return (
    <div className="data-table">
      <Table responsive primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Transactions</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <div className="text-danger">{error}</div>
          ) : !users?.length ? (
            <div>No Users Found</div>
          ) : (
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td className="user-id">{user.id}</td>
                  <td className="username">{user.username}</td>
                  <td className="email">{user.email}</td>
                  <td className="role">{user.role}</td>
                  <td className="transactions">{user.transactionsCount}</td>
                  <td>
                    <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                      <button
                        onClick={_e => {
                          handleView({
                            id: user.id || -1,
                            username: user.username,
                            password: user.password,
                            email: user.email,
                            role: user.role
                          });
                        }}
                      >
                        <FiEdit2 className="text-blue" /> Edit
                      </button>
                      <button
                        onClick={_e => {
                          handleRemove(user.id || -1);
                        }}
                      >
                        <TfiClose className="text-danger" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <TablePagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        isLoading={isPagingLoading}
      />
    </div>
  );
};
