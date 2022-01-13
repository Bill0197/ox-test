import Routes from './Routes';
import axios from 'axios';

function App() {
  const token = localStorage.getItem('token');

  if (token) {
    axios.interceptors.request.use(function (config) {
      config.headers.authorization = token;

      return config;
    });
  }

  return <Routes />;
}

export default App;
