
import React from 'react';
import NYIcon from "../images/NY.png"

const  NavBar = () => {
    return (
      <header className="header">
    		<img src={NYIcon} alt="NY"/>
          <ul className="main-nav">
              <li><a href="/">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
          </ul>
    	</header>
     )
  }

export default NavBar;
