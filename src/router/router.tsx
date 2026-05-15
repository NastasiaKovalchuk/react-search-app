import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomePage from '../components/HomePage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [{ path: ':page?', element: <HomePage /> }],
  },
]);
