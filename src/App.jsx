import React from 'react';
import DesignerImage from './Designer.png'

const App = () => {
  return (
    <>
      <div className="container">
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
    </>
  )
}

export default App
