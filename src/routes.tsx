import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { RegistrationLayout } from './pages/_layouts/registration';
import { AppLayout } from './pages/_layouts/app';
import { Questionnaire } from './pages/InformationCapture/Questionnaire';
import { Dashboard } from './pages/Dashboard';
import { MealPlan } from './pages/MealPlan';
import { MyActivity } from './pages/MyActivity';

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
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
      {
        path: "/plano-alimentar",
        element: <AppLayout />,
        children: [
          { path: "/plano-alimentar", element: <MealPlan />},
        ],
      },
      {
        path: "/minha-atividade",
        element: <AppLayout />,
        children: [
          { path: "/minha-atividade", element: <MyActivity />},
        ],
      },
  ]);