const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MyApp</div>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/About" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="/Product" className="text-white hover:text-gray-300">
              Product
            </a>
          </li>
          <li>
            <a href="/Contact" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
          <li>
            <a href="/Login" className="text-white hover:text-gray-300">
              Log In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
