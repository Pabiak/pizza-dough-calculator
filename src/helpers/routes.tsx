import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";
import CalculatorPage from "@/pages/CalculatorPage";
import RecipesPage from "@/pages/RecipesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <CalculatorPage />,
      },
      {
        path: "/przepisy",
        element: <RecipesPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
