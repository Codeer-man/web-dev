import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormData from "./components/formData";
import Dnd from "./components/dnd";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<FormData />} />
        <Route path="/dnd" element={<Dnd />} />
      </Routes>
    </BrowserRouter>
  );
}
