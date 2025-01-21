import { Outlet, NavLink } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/accodion">Accordion</NavLink>
            </li>
            <li>
              <NavLink to="/randomcolor">Random color</NavLink>
            </li>
            <li>
              <NavLink to="/rating">Star ratingr</NavLink>
            </li>
            <li>
              <NavLink to="/imageSlider">image slider</NavLink>
            </li>
            <li>
              <NavLink to="/loadMore">Load more button</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
