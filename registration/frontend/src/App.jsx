import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rootlayout from "./layout/Rootlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contactus";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";

import Logout from "./components/auth/logout";

import Notfound from "./layout/errorHandling";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/logout" element={<Logout />} />

      <Route path="*" element={<Notfound />} />
    </Route>
  )
);
export default function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}
