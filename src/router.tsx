import { createBrowserRouter } from "react-router-dom";

import BaseLayout from "./designSystem/BaseLayout/BaseLayout";
import Home from "./Home";
import Gps from "./Gps";

export const allRouters = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/gps",
        element: <Gps />,
      },
    ],
  },
]);
