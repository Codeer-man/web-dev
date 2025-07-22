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
import ImageSlider from "./components/imageSlider";
import LoadMore from "./components/LoadMore";
import SlideMenu from "./components/tree-view";
import QrCodeGenerator from "./components/QRcode";
import ThemeChanger from "./components/ThemeChanger";

import Accordian from "./components/accodion/Index";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/accordion" element={<Accordian />} />
        <Route path="/randomcolor" element={<RandomColorGen />} />
        <Route path="/rating" element={<Rating stars={10} />} />
        <Route
          path="/imageSlider"
          element={
            <ImageSlider url={"https://picsum.photos/v2/list"} limit={"10"} />
          }
        />
        <Route path="/loadMore" element={<LoadMore />} />
        <Route path="menu" element={<SlideMenu />} />
        <Route path="/qrcode" element={<QrCodeGenerator />} />
        <Route path="/theme" element={<ThemeChanger />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div className="h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
