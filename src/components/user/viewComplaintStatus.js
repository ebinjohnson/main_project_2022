import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../user/viewappointment.css";
const axios = require("axios");
const ViewComplaintStatus = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState([]);

  let id = window.localStorage.getItem("id");

  async function getComplaints() {
    let data = {
      id: id,
    };
    let response = await axios.post(
      "http://localhost:5000/getcomplaintstatus",
      data
    );
    if (response.status === 200) {
      setComplaints(response.data.complaints);
    }
  }

  useEffect(() => {
    getComplaints();
  }, []);

  const data = {};
  const username = window.localStorage.getItem("username");
  function handleLogOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    history.push("/login");
  }
  return (
    <div>
      <ul className="sidenav">
        <div className="username">
          <i className="fa fa-user"></i>
          <h5>{username}</h5>
        </div>
        <li>
          <Link to="/userhome">
            <a href="#">Home</a>
          </Link>
        </li>
        <li>
          <Link to="/viewappointment">
            <a href="#">View Appointments</a>
          </Link>
        </li>
        <li>
          <Link to="/complaintstatus">
            <a className="active" href="#">
              View Complaint Status
            </a>
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
      <div class="container bg-white">
        <div class="row">
          <div class="newcard" style={{ width: "900px", marginTop: "-30%" }}>
            <div class="viewcard" style={{ width: "900px", height: "300px" }}>
              <div class="card-body">
                <h5 class="card-title text-uppercase mb-0">My Complaints</h5>
                <div class="table-responsive">
                  <table class="col-md-12" width="200px">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium pl-4"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Date of Complaint
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Subject
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints &&
                        complaints.length > 0 &&
                        complaints.map((a) => {
                          return (
                            <tr>
                              <td class="pl-4"></td>
                              <td>
                                <h5 class="font-medium mb-0">{a.doc}</h5>
                              </td>
                              <td>
                                <span class="text-muted">{a.subject}</span>
                              </td>
                              <td>
                                <span class="text-muted">{a.location}</span>
                              </td>
                              <td>
                                <span class="text-muted">{a.description}</span>
                              </td>
                              <td>
                                <span class="text-muted">{a.status}</span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewComplaintStatus;
