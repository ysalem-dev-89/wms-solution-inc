import { Outlet } from 'react-router-dom';
import Header from './layouts/Header';

const BlankLayout = () => (
  <div className="d-flex">
    <div className="container-fluid px-0">
      <Header />
      <main
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: '#d8e4ef',
          height: '100%'
        }}
      >
        <Outlet />
      </main>
    </div>
  </div>
);

export default BlankLayout;
