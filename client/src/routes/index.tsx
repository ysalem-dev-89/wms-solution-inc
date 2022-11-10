import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Transactions from '../pages/Transactions';
import Error from '../pages/Errors';
import ThemeLayout from '../ThemeLayout';
import BlankLayout from '../blankLayout';
import About from '../pages/About';
import { PrivateRoute } from './PrivateRoute';
import OneTransaction from '../pages/OneTransaction';
import Invoice from '../pages/Invoice';

const themeRoutes = [
  {
    children: [
      {
        path: '/',

        element: (
          <PrivateRoute>
            <ThemeLayout />
          </PrivateRoute>
        ),
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: '/dashboard', element: <Dashboard /> },
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
      {
        element: <BlankLayout />,
        children: [
          { path: '/about', element: <About /> },
          {
            path: '/login',
            element: <Login />
          }
        ]
      }
    ]
  },
  { path: '*', element: <Error /> }
];

export default { themeRoutes };
