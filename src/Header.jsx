import React, { useState } from "react";
import Designer from "../src/component/Designer.jpg";
import { Link } from "react-router-dom";

const Header = () => {
 
  const [btnName, setbtnName] = useState("Login");
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={Designer} alt="logo" width="100px" height="100px" />
        </div>
        <div className="curve curve-top"></div>
        <div className="curve curve-bottom"></div>
        <div className="nav-items">
          <ul>
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
            <button
              className="login"
              onClick={() => {
                btnName == "Login" ? setbtnName("Logout") : setbtnName("Login");
              }}
            >
              {btnName}
            </button>
          </ul>
        </div>
      </div>
      <div className="header-1">
        <h1
          className="App-header"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Welcome to Zaika
        </h1>
      </div>
    </>
  );
};

export default Header;
