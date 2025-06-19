import { createBrowserRouter } from "react-router-dom";
import ExamplePage from "@/pages/examplePage";

import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "example",
        element: <ExamplePage />,
      },
    ],
  },
]);
