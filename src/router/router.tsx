import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard.tsx";
import Home from "@/pages/Home.tsx";
import { AuthLayout } from "@/pages/AuthLayout.tsx";
import { Layout } from "@/pages/Layout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
