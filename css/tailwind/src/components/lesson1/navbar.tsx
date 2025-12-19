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
    <div className=" flex items-center justify-between py-4 ">
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
      <div className=" flex items-center gap-8">
        {links.map((links, index) => (
          <Link
            className=" text-neutral-800 font-medium hover:text-neutral-500 transition duration-200"
            to={links.href}
            key={index}
          >
            {links.title}{" "}
          </Link>
        ))}
        <button className="px-4 py-2 bg-[#2579F4] font-bold  shadow-lg tracking-wide  text-white rounded-lg text-shadow-lg cursor-pointer transistion duration-200 hover:bg-blue-700 ">
          Start free trial
        </button>
      </div>
    </div>
  );
};

export default Navbar;
