import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
