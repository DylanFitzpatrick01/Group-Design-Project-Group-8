import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ navLinks }) => {
    return (
        <nav className="navbar">
          <h1> TITLE </h1>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      );
}    
export default NavBar;