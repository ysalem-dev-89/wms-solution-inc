// import { RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';

function App() {
  return (
    <>
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div style={{ flex: '1' }}>
          <Header />
          <div
            className="page-body"
            style={{ padding: '10px', fontSize: '30px' }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
