import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Contact from "./pages/contactus";
import LogIn from "./pages/login";
import Error from "./pages/Error";
import UseCase from "./pages/UseCase";
import DataProvider from "./pages/DatProvider";
import { Children, useContext } from "react";
function App() {

  const data = useContext(DataProvider)
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} errorElement={<Error />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/UseCase" element={<UseCase />} />
        <Route path="/DataProvider" element={<DataProvider />} />
      </Routes>
      <Footer />
      <DataProvider>
        {Children}
      </DataProvider>
    </Router>
  );
}

export default App;
