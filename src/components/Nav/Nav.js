import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/yourprojects">
            Your Projects
          </Link>
        </li>
        <li>
          <Link to="/infoandsettings">
            Info and Settings
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
