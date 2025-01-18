import Accodion from "./components/accodion/Index";
import RandomColorGen from "./components/RandomColorGenerator";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { NotFound } from "./layout/NotFound";
import Rating from "./components/rating";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/accodion" element={<Accodion />} />
        <Route path="/randomcolor" element={<RandomColorGen />} />
        <Route path="/rating" element={<Rating  stars={10}/>} />
        
        
        <Route path="*" element={<NotFound />} />
      </Route>

      
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
