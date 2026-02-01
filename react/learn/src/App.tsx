import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redux from "./components/rtk/redux";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
    },
    {
      path: "/reducer",
      element: <Redux />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
