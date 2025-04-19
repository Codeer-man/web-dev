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
import Memo from "./pages/memo";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOrder from "./pages/Admin/AdminOrder";
import Product from "./pages/Admin/Product";
import NotFound from "./components/NotFound";
import Cart from "./pages/cart";
import Auth from "./store/auth";
import StepCount from "./Reducer/stepCount";
import Todo from "./Reducer/Todo";
import CounterHistory from "./Reducer/CounterHistory";
import Taskmanage from "./Reducer/taskmanage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usecase" element={<Usecase />} />
        <Route path="/useRef" element={<Form />} />
        <Route path="/useReducer" element={<UseReduce />} />
        <Route path="/Memo" element={<Memo />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="order" element={<AdminOrder />} />
          <Route path="productlist" element={<Product />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/reducer" element={<Taskmanage />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
