import React from "react";
import logo from "../../../assets/images/veterinary-doctor-logo.png";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import "./Sidebar.css";
function Sidebar({ sidebarOpen, closeSidebar }) {
  const history = useHistory();
  console.log(closeSidebar);
  function handleLogOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    history.push("/login");
  }
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Vetcare </h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>

          <Link to="/dashboard">Dashboard</Link>
        </div>
        <h2>MORE</h2>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <Link to="/addproducts">Products</Link>
          {/* <a href="#"></a> */}
        </div>
        <div className="sidebar__link">
          <i className="fa fa-history"></i>
          <Link to="/complaintbox">Complaints</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-edit"></i>
          <a href="#">Edit Profile</a>
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <button onClick={() => handleLogOut()}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
