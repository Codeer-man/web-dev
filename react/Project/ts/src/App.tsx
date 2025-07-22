import { BrowserRouter, Route, Routes } from "react-router-dom";
import Learn from "./components/learn/page";
import DropZone from "./components/learn/drop-zone/page";
import Tailwind from "./components/learn/tailwind/page";
import Vanila from "./components/learn/tailwind/vanilaCss/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/learn" element={<Learn />}>
          <Route path="drop" element={<DropZone />} />
          <Route path="tailwind" element={<Tailwind />}>
            <Route path="vanila" element={<Vanila />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}