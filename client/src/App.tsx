// import { RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import './css/custom.min.css';
import './main.css';

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid px-0">
        <Header />
        <main className="page-body bg-bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
