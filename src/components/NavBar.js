
import React from 'react';
import USAIcon from "../images/US.png"

const  NavBar = () => {
    return (
      <header className="header">
        <div className="header-content">
      		<img className="img" src={USAIcon} alt="NY"/>
          <h1 className="logo"><a href="/">The National Parks</a></h1>
        </div>
    	</header>
     )
  }

export default NavBar;
