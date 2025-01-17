import { useNavigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
      Admin layout page
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Go to home
        </button>
        <button
          onClick={() => {
            navigate("/admin/order");
          }}
        >
          Go to order
        </button>
        <button
          onClick={() => {
            navigate("/admin/productlist");
          }}
        >
          go to product list
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
