import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus"; // Renamed for consistency
import Services from "./pages/Services";
import Contact from "./pages/contactus"; // Renamed for consistency
import Login from "./pages/Login";
import Usecase from "./pages/Usecase";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usecase" element={<Usecase />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
