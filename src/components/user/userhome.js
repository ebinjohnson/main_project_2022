import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../user/userHome.css";
import Vaccine from "../../assets/images/vaccine.png";
import Calendar from "../../assets/images/calendar.png";
import Report from "../../assets/images/report.png";
import MarketPlace from "../../assets/images/marketplace.png";

function UserHome() {
  const history = useHistory();
  const username = window.localStorage.getItem("username");
  function handleLogOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    history.push("/login");
  }
  useEffect(() => {
    if (username == null) {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <ul className="sidenav">
        <div className="username">
          <i className="fa fa-user"></i>
          <Link to="/viewprofile">
            <h5>{username}</h5>
          </Link>
        </div>
        <li>
          <a className="active" href="#home">
            Home
          </a>
        </li>
        <li>
          <Link to="/viewappointment">
            <a href="#">View Appointments</a>
          </Link>
        </li>
        <li>
          <Link to="/complaintstatus">
            <a href="#">View Complaint Status</a>
          </Link>
        </li>

        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={() => handleLogOut()}
        >
          {" "}
          Log Out
        </button>
      </ul>

      <div className="header">
        <h1>VetCare</h1>
        <h1>Care for Pets</h1>

        <p>
          VetCare was founded with a vision of pairing professional management
          and talented medical teams to deliver high quality veterinary care.
        </p>
      </div>

      <div className="row1-container">
        <div className="box box-down cyan">
          <Link to="/appointment">
            <a href="#">
              <h2>Book an Appoinment</h2>
              <p>
                Book an appoinment with the doctors in your nearby Veterinary
                clinic
                <img className="free" src={Calendar} alt="" />
              </p>
            </a>
          </Link>
        </div>

        <div className="box red">
          <Link to="/bookvaccine">
            <a href="#">
              <h2>Vaccination</h2>
              <p>Click here to book vaccination slot for your pet.</p>
              <img className="free" src={Vaccine} alt="" />
            </a>
          </Link>
        </div>

        <div className="box box-down blue">
          <Link to="/complaintform">
            <a href="#">
              <h2>Complaints</h2>
              <p>If you want to send any complaints of animal harrassment.</p>
              <img className="free" src={Report} alt="" />
            </a>
          </Link>
        </div>
      </div>
      <Link to="/viewproducts">
        <div className="row2-container">
          <div className="box orange">
            <h2>Market Place</h2>
            <p>Check here for petcare products and pets</p>
            <img className="free" src={MarketPlace} alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
}
export default UserHome;
