import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateDiet } from './pages/diet/CreateDiet';
import { RegistrationLayout } from './pages/_layouts/registration';
import { AppLayout } from './pages/_layouts/app';
import { CaptureAge } from './pages/InformationCapture/CaptureAge';
import { Questionnaire } from './pages/InformationCapture/Questionnaire';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/registration",
        element: <RegistrationLayout />,
        children: [
          { path: "/registration", element: <Questionnaire /> },
        ],
      },
      {
        path: "/dashboard",
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <CreateDiet /> },
        ],
      },
  ]);