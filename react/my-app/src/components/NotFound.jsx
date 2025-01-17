import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
      <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Home Page
      </button>
    </div>
  );
}
