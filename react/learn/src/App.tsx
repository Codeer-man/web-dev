import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redux from "./components/rtk/redux";
import Counter from "./components/month/01_counter";
import Quote from "./components/month/02_quote";
import ColorPicker from "./components/month/03_color-picker";
import Timer from "./components/month/04_timer";
import Todo from "./components/month/05_todo";
import ExpenseTracter from "./components/month/06_expense-tracker";
import Weather from "./components/month/07_weather";
import GitUser from "./components/month/08_git-user";
import Note from "./components/month/09_note";
import Imdb from "./components/month/10_imdb";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
    },
    {
      path: "/reducer",
      element: <Redux />,
    },
    {
      path: "/counter",
      element: <Imdb />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
