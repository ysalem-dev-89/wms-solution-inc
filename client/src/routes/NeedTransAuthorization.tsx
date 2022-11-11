import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children?: JSX.Element;
};

export const NeedTransAuthorization = ({ children }: Props) => {
  const { auth } = useAuth();
  const { user } = auth;

  return (
    <>
      {user?.role == 'admin' || user?.role == 'transactions' ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
