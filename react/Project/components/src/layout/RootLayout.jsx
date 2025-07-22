import { Outlet, NavLink } from "react-router-dom";
import navLinks from "./data";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="container mx-auto p-4">
          <ul className="flex gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-6 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
