import React, { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import { FaHamburger } from "react-icons/fa";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLogin = () => {
    setBtnName((prevBtnName) => (prevBtnName === "Login" ? "Logout" : "Login"));
  };

  return (
    <>
      <header className="flex items-center justify-between sm:p-4  p-2">
        <div className="text-yellow-600 font-bold text-2xl">
          <p>EatXpress.</p>
        </div>
        <nav className="max-sm:hidden">
          <ul className="flex justify-around items-center gap-4">
            <li>Online Status : {onlineStatus == true ? "🟢" : "🔴"}</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>Cart</li>
            <li>
              <button className="login" onClick={toggleLogin}>
                {btnName}
              </button>
            </li>
            <li>
              <Link to="/grocery">Grocery</Link>
            </li>
          </ul>
        </nav>
        {/* sliding nav */}
        <div className="relative sm:hidden">
          {/* Hamburger Button */}
          <nav className="text-yellow-600 font-bold text-2xl ">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaHamburger />
            </button>
          </nav>

          {/* Sliding Nav Menu */}
          <div
            className={`fixed top-0 right-0 w-1/2 h-full bg-yellow-600 text-white z-10 p-4 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2"
            >
              ✖
            </button>
            <ul className="mt-10 space-y-4">
              <li onClick={() => setIsOpen(false)}>
                <Link to="/" className="block text-xl">
                  Home
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link to="/about" className="block text-xl">
                  About
                </Link>
              </li>
              {/* <li>
                <Link to="/services" className="block text-xl">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block text-xl">
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
