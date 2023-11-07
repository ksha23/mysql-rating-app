import { Link } from "react-router-dom";
import logoImage from "./logo192.png"; // Path to your placeholder image

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="flex items-center pl-4">
        <Link to="/" className="hover:underline">
          <img src={logoImage} alt="logo" className="w-6 h-6 mr-2 inline" />
          Home
        </Link>
        <div className="flex space-x-4 ml-4">
          <Link to="/halls" className="hover:underline">
            Dining Halls
          </Link>
          {/* Add more links here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
