import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../user/viewappointment.css";
const axios = require("axios");
const Viewappointment = () => {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);

  let id = window.localStorage.getItem("id");

  async function getAppointments() {
    let data = {
      id: id,
    };
    let response = await axios.post(
      "http://localhost:5000/getActiveappointment",
      data
    );
    if (response.status === 200) {
      setAppointments(response.data.appointments);
    }
  }
  async function handleCancel(id) {
    let data = {
      appointmentID: id,
    };
    let response = axios
      .post("http://localhost:5000/cancelappointment", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (username == null) {
      history.push("/login");
    } 
    getAppointments();
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
          <a className="active" href="#news">
            View Appointments
          </a>
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
      <div class="container bg-white">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-uppercase mb-0">My Appointments</h5>
                <div class="table-responsive">
                  <table class="table no-wrap user-table mb-0">
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
                          Name
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Pet
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Hospital
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Date andTIme
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="border-0 text-uppercase font-medium"
                        >
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments &&
                        appointments.length > 0 &&
                        appointments.map((a) => {
                          return (
                            <tr>
                              <td class="pl-4"></td>
                              <td>
                                <h5 class="font-medium mb-0">
                                  {a.AppointName}
                                </h5>
                              </td>
                              <td>
                                <span class="text-muted">{a.AppointPet}</span>
                              </td>
                              <td>
                                <span class="text-muted">{a.AppointPhone}</span>
                              </td>
                              <td>
                                <span class="text-muted">
                                  {a.AppointHospital}
                                </span>
                              </td>
                              <td>
                                <span class="text-muted">{a.AppointDate}</span>
                                <br />
                                <span class="text-muted">{a.AppointTime}</span>
                              </td>
                              <td>
                                <span class="text-muted">{a.status}</span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleCancel(a._id);
                                  }}
                                  class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                >
                                  <i class="fa fa-trash"></i>{" "}
                                </button>
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
export default Viewappointment;
