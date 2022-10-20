import { useRoutes } from 'react-router-dom';
import './css/custom.min.css';
import './main.css';
import themeRoutes from './routes';

function App() {
  const routing = useRoutes(themeRoutes);
  return <>{routing}</>;
}

export default App;
