import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 sticky top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        <a
          href="/"
          className="text-white text-2xl font-bold hover:text-gray-200 transition-transform transform hover:scale-110 duration-300"
        >
          Logo
        </a>

        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/"
              className="text-black text-lg relative hover:text-white transition-transform transform hover:scale-110 duration-300"
              activeClassName="underline decoration-2 decoration-white"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className="text-black text-lg relative hover:text-white transition-transform transform hover:scale-110 duration-300"
              activeClassName="underline decoration-2 decoration-white"
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className="text-black text-lg relative hover:text-white transition-transform transform hover:scale-110 duration-300"
              activeClassName="underline decoration-2 decoration-white"
            >
              About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              className="text-black text-lg relative hover:text-white transition-transform transform hover:scale-110 duration-300"
              activeClassName="underline decoration-2 decoration-white"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/LogIn"
              className="text-black text-lg relative hover:text-white transition-transform transform hover:scale-110 duration-300"
              activeClassName="underline decoration-2 decoration-white"
            >
              LogIn
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}