import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
      <NavLink
        to="/"
        className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
      >
        Go to Home
      </NavLink>
    </div>
  );
}
