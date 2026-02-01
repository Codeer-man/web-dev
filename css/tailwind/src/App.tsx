import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Lesson1 from "./components/lesson1/page";
import Themeing from "./components/lesson2/page";
import Keyboard from "./components/lesson2/keyboard/page";
import DarkMode from "./components/lesson3/page";

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
    {
      path: "/lesson2",
      element: <Themeing />,
      children: [
        {
          path: "keyboard",
          element: <Keyboard />,
        },
      ],
    },
    {
      path: "/responsive",
      element: <DarkMode />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
