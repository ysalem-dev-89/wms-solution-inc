import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Transactions from '../pages/Transactions';
import Error from '../pages/Errors';
import ThemeLayout from '../ThemeLayout';
import BlankLayout from '../blankLayout';
import About from '../pages/About';
import { PrivateRoute } from './PrivateRoute';
import OneTransaction from '../pages/OneTransaction';
import Invoice from '../pages/Invoice';
import { NeedTransAuthorization } from './NeedTransAuthorization';
import { NeedAdminAuthorization } from './NeedAdminAuthorization';
import POS from '../pages/POS';
import BlankPageLayout from '../blankPageLayout';
import { ToastContainer } from 'react-toastify';

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
          {
            path: '/users',
            element: (
              <NeedAdminAuthorization>
                <Users />
              </NeedAdminAuthorization>
            )
          },
          { path: '/products', element: <Products /> },
          { path: '/categories', element: <Categories /> },
          {
            path: '/transactions',
            element: (
              <NeedTransAuthorization>
                <Transactions />
              </NeedTransAuthorization>
            )
          },
          {
            path: '/transactions/:id/',
            element: (
              <NeedTransAuthorization>
                <Invoice />
              </NeedTransAuthorization>
            )
          },
          {
            path: '/transactions/:id/edit',
            element: (
              <NeedTransAuthorization>
                <OneTransaction operation={'edit'} />
              </NeedTransAuthorization>
            )
          },
          {
            path: '/transactions/add/',
            element: (
              <NeedTransAuthorization>
                <OneTransaction operation={'add'} />
              </NeedTransAuthorization>
            )
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
      },
      {
        element: <BlankPageLayout />,
        children: [
          { path: '/pos', element: <POS operation="add" /> },
          { path: '/pos/:id', element: <Invoice /> }
        ]
      }
    ]
  },
  { path: '*', element: <Error /> }
];

export default { themeRoutes };
