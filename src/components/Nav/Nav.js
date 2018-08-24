import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li   className="horizontal-list">
          <Link to="/yourprojects">
            Projects
          </Link>
        </li>
        <li   className="horizontal-list">
          <Link to="/infoandsettings">
            Info
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;