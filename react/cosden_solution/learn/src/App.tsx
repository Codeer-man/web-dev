import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormData from "./components/formData";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<FormData />} />
      </Routes>
    </BrowserRouter>
  );
}
