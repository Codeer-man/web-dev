import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // createBrowserRouter,
  // createRoutesFromChildren,
} from "react-router-dom";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Contact from "./pages/contactus";
import LogIn from "./pages/login";
import Error from "./pages/Error";
// import RouteLayout from "./Layout/RouteLayout";

function App() {
  // const browser = createBrowserRouter(
  //   createRoutesFromChildren(
  //     <Route path="/" element={<RouteLayout />}>
  //       <Route index element={<Home />} errorElement={<Error />} />
  //       <Route path="aboutus" element={<Aboutus />} />
  //       <Route path="service" element={<Services />} />
  //       <Route path="contact" element={<Contact />} />
  //       <Route path="login" element={<LogIn />} />
  //     </Route>
  //   )
  // );
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} errorElement={<Error />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
