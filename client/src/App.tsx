import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authApi } from './api';
import './assets/styles/custom.min.css';
import useAuth from './hooks/useAuth';
import './main.css';
import Routes from './routes';
import { Spinner } from 'reactstrap';

function App() {
  const { auth, dispatch } = useAuth();
  const routing = createBrowserRouter(Routes.themeRoutes);

  useEffect(() => {
    (async () => {
      try {
        const user = await authApi.checkToken();

        dispatch?.({
          type: 'INITIALISE',
          payload: { user, loggedIn: true }
        });
      } catch (err) {
        dispatch?.({
          type: 'INITIALISE',
          payload: { user: undefined, loggedIn: false }
        });
      }
    })();
  }, []);

  return auth.checkedToken ? (
    <RouterProvider router={routing} />
  ) : (
    <div className={`loading-center d-flex gap-2`}>
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
    </div>
  );
}

export default App;
