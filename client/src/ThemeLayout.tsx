import { Outlet } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';

const ThemeLayout = () => (
  <div className="d-flex">
    <Sidebar />
    <div className="container-fluid px-0">
      <Header />
      <main className="page-body bg-bg-light overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default ThemeLayout;
