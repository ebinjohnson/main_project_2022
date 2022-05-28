import React, { useState } from "react";
import UserMain from "../Main/usermanage";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./Dashboard.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function UserDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Switch>
      <div className="dashboardContainer">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <UserMain/>
      </div>
    </Switch>
  );
}

export default UserDash;
