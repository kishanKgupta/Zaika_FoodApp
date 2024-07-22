import React from "react";
import DesignerImage from "./component/Designer.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={DesignerImage} alt="logo" width="100px" height="100px" />
        </div>
        <div className="curve curve-top"></div>
        <div className="curve curve-bottom"></div>
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Cart</li>
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
