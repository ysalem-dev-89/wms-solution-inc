import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children?: JSX.Element;
};

export const NeedAdminAuthorization = ({ children }: Props) => {
  const { auth } = useAuth();
  const { user } = auth;
  console.log(user);
  return (
    <>
      {user?.role == 'admin' || user?.role == 'superAdmin' ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
