import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lesson from "./components/lesson1/page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lesson />} />
      </Routes>
    </Router>
  );
}
