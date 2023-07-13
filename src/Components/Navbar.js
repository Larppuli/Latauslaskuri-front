import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" activeclassname="active">Etusivu</NavLink>
        </li>
        <li>
          <NavLink to="/latauslaskuri" activeclassname="active">Latauslaskuri</NavLink>
        </li>
        <li>
          <NavLink to="/ajopaivakirja" activeclassname="active">Ajopäiväkirja</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;