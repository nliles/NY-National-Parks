
import React from 'react';
import USAIcon from "../images/USA.png"

const  NavBar = () => {
    return (
      <header className="header">
        <div className="div">
      		<img className="img" src={USAIcon} alt="NY"/>
          <h1 className="logo"><a href="/">National Parks</a></h1>
        </div>
    	</header>
     )
  }

export default NavBar;
