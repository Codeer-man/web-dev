import { Link, useNavigate } from "react-router-dom";

const links = [
  {
    title: "Guide",
    href: "/guide",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "login",
    href: "/Login",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to={"/"}>
        <img
          loading="lazy"
          draggable={false}
          src="./logo.svg"
          alt="logoImage"
          title="Logo Image"
          width={"100px"}
          onClick={() => navigate("/sdfg")} //window.location.reload()
        />
      </Link>
      <div className="flex items-center gap-8">
        {links.map((links, index) => (
          <Link
            className="font-medium text-neutral-800 transition duration-200 hover:text-neutral-500"
            to={links.href}
            key={index}
          >
            {links.title}{" "}
          </Link>
        ))}
        <button className="transistion cursor-pointer rounded-lg bg-[#2579F4] px-4 py-2 font-bold tracking-wide text-white shadow-lg duration-200 text-shadow-lg hover:bg-blue-700">
          Start free trial
        </button>
      </div>
    </div>
  );
};

export default Navbar;
