import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ navLinks }) => {
    const location = useLocation();
    return (
        <nav className="navbar">
          <h1> Trinity College Dublin  </h1>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.to} className={location.pathname === link.to ? "active" : ""}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      );
}    
export default NavBar;