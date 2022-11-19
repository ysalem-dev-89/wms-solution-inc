import { Outlet } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

const BlankPageLayout = () => (
  <main
    className="page-body p-3"
    style={{
      backgroundColor: '#d8e4ef',
      minHeight: '100vh'
    }}
  >
    <Outlet />
  </main>
);

export default BlankPageLayout;
