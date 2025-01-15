import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus"; // Renamed for consistency
import Services from "./pages/Services";
import Contact from "./pages/contactus"; // Renamed for consistency
import Login from "./pages/Login";
import Usecase from "./pages/Usecase";
import Form from "./pages/useRef";
import UseReduce from "./pages/useReduce";
import Debounce from "./pages/Debounce";
import Memo from "./pages/memo"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usecase" element={<Usecase />} />
        <Route path="/useRef" element={<Form />} />
        <Route path="/useReducer" element={<UseReduce />} />
        <Route path="/Memo" element={<Memo />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
