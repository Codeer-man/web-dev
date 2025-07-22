import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ts from "./components/part1/project/ts/one/page";
import Motion from "./components/part2/components/motion/basic/page";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/part1">
              <Route path="ts/project" element={<Ts />} />
            </Route>

            <Route path="/part2">
              <Route path="components" element={<Motion />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
