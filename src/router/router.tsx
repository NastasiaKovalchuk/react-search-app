import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import { CharacterDetails } from '../pages/CharacterDetails';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: 'details/:id',
            element: <CharacterDetails />,
          },
        ],
      },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
