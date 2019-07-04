import React from 'react';
import USAIcon from "../images/USA.png"
import { Link } from 'react-router-dom'

const  NavBar = () => (
  <header className="header">
    <div className="header-content">
  		<img className="header-logo" src={USAIcon} alt="NY"/>
      <Link to={`/`}><h1 className="header-title">The National Parks</h1></Link>
    </div>
	</header>
)


export default NavBar;
