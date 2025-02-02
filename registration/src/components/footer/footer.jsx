import {
  FaFacebookF,
  FaGithub,
  FaTelegramPlane,
  FaInstagram,
  FaBehance,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-2">|||</span> Site
            <span className="text-gray-300">Logo</span>
          </h2>
          <p className="text-gray-400 mt-3">
            High level experience in web design and development knowledge,
            producing quality work.
          </p>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Web-designers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Marketers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Small Business
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Website Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/about" className="text-gray-400 hover:text-white">
                About Us
              </NavLink>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <NavLink href="#" className="text-gray-400 hover:text-white">
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink href="#" className="text-gray-400 hover:text-white">
                Teams
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaTelegramPlane />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaBehance />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
