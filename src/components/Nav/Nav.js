import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const newDoc = ()=>{
  cookies.set('document', '')
  cookies.set('title', '')
  window.location.reload();
}

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
          <Link to="/editor" onClick={()=>newDoc()}>
            New Project
          </Link>
        </li>
        <li   className="horizontal-list">
          <Link to="/infoandsettings">
            Info
          </Link>
        </li>
        
        <li   className="horizontal-right-list">
          <Link to="/home">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;