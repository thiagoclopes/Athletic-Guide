import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateDiet } from './pages/diet/CreateDiet';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/create-diet",
        element: <CreateDiet />,
      },
  ]);