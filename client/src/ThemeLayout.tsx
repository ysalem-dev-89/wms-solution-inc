import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PageContextProvider } from './contexts/PageContext';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';

const ThemeLayout = () => (
  <div className="d-flex">
    <Sidebar />
    <div className="container-fluid px-0">
      <PageContextProvider>
        <Header />
        <main className="page-body bg-bg-light overflow-auto">
          <Outlet />
          {/* <ToastContainer /> */}
        </main>
      </PageContextProvider>
    </div>
  </div>
);

export default ThemeLayout;
