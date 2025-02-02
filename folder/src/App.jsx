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
import LogIN from "./components/registration/Login";
import Register from "./components/registration/register";

import Notfound from "./layout/errorHandling";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LogIN />} />
      <Route path="/register" element={<Register />} />

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
