import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Transactions from '../pages/Transactions';
import Error from '../pages/Errors';
import ThemeLayout from '../ThemeLayout';
import OneTransaction from '../pages/OneTransaction';
import Invoice from '../pages/Invoice';

const themeRoutes = [
  {
    path: '/',
    element: <ThemeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/login', element: <Login /> },
      { path: '/users', element: <Users /> },
      { path: '/user/:username/profile', element: <Profile /> },
      { path: '/products', element: <Products /> },
      { path: '/categories', element: <Categories /> },
      { path: '/transactions', element: <Transactions /> },
      {
        path: '/transactions/edit/:id',
        element: <OneTransaction operation={'edit'} />
      },
      {
        path: '/transactions/edit/:id/invoice',
        element: <Invoice />
      },
      {
        path: '/transactions/add/',
        element: <OneTransaction operation={'add'} />
      }
    ]
  },
  { path: '*', element: <Error /> }
];

export default themeRoutes;
