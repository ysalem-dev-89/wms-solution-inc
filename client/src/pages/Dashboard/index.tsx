import './style.css';
import { useContext, useEffect } from 'react';
import { PageContext } from '../../contexts/PageContext';
import { LoadingContextProvider } from '../../contexts/LoadingContext';
import Layout from './Layout';

const Dashboard = () => {
  const { setPages } = useContext(PageContext);

  useEffect(() => {
    setPages([{ title: 'Dashboard', link: '' }]);
  }, []);

  return (
    <LoadingContextProvider>
      <Layout />
    </LoadingContextProvider>
  );
};

export default Dashboard;
