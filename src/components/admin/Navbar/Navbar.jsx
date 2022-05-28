import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import avatar from "../.";

function Navbar({ sidebarOpen, openSidebar }) {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
      <Link to="/dashboard">
        <a className="active_link" href="">
         Hospital
        </a>
        </Link>
        <Link to="/userdash">
        <a className="active_link" href="">
          Users
        </a>
        </Link>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        <a href="#">
          {/* <img width="30" src={avatar} alt="avatar" /> */}
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
