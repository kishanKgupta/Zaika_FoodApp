import React, { useState } from "react";
import Designer from "../src/component/Designer.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const toggleLogin = () => {
    setBtnName((prevBtnName) => (prevBtnName === "Login" ? "Logout" : "Login"));
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={Designer} alt="logo" width="6.25rem" height="6.25rem" />
      </div>
      <div className="curve curve-top"></div>
      <div className="curve curve-bottom"></div>
      <nav className="nav-items">
        <ul>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
