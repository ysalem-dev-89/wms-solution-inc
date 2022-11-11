import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children?: JSX.Element;
};

export const NeedAdminAuthorization = ({ children }: Props) => {
  const { auth } = useAuth();
  const { user } = auth;
  return <>{user?.role == 'admin' ? children : <Navigate to="/login" />}</>;
};
