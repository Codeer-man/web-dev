import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Layout from "./Layout";
import Game from "./components/game";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
          children: [
            {
              path: "game",
              element: <Game />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
