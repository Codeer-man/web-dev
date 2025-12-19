import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Lesson1 from "./components/lesson1/page";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
    {
      path: "/finta",
      element: <Lesson1 />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
