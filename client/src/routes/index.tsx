import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Transactions from '../pages/Transactions';
import Error from '../pages/Errors';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/login', element: <Login /> },
      { path: '/users', element: <Users /> },
      { path: '/user/:username/profile', element: <Profile /> },
      { path: '/products', element: <Products /> },
      { path: '/categories', element: <Categories /> },
      { path: '/transactions', element: <Transactions /> }
    ]
  }
]);

export default router;
