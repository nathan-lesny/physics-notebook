import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/BlockM.png';
import './navbar.css';

const Navbar = () => {
  return (
    <>
      <nav>
        <div>
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <div>
            <Link className="nav-link" to="/">Home</Link>
          </div>
          <div>
            <Link className="nav-link" to="/about">About</Link>
          </div>
        </div>
      </nav>
      <div className="nav-spacer"></div>
    </>
  );
};

export default Navbar;