import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Logo from "../../assets/images/Vetcarelogo.png";
import "./manageappointments.css";
import "./hospitalHome.css";
const axios = require("axios");
const ViewNewappointment = () => {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  // const hospitalName = window.localStorage.setItem("hospitalName");
  async function getAppointments() {
    let newdata = {};
    let response = await axios.post(
      "http://localhost:5000/getonlyActiveappointment",
      newdata
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
      .post("http://localhost:5000/cancelhospitalappointment", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAppointments();
  }, []);

  const data = {};
  return (
    <div>
      <div className="dashboard">
        <div class="sidenav">
          <img src={Logo} />
          <br />
          <Link to="/hospitalhome">
            <a href="">
              <i className="fa fa-home" />
              HOME
            </a>
          </Link>
          <Link to="/viewnewappointment">
            <a href="#" className="active">
              <i className="fa fa-cogs" />
              Manage
            </a>
          </Link>
          <Link to="">
            <a href="#">Profile</a>
          </Link>
          <Link to="">
            <a href="#">Contact</a>
          </Link>
        </div>
      </div>
      <div className="container bg-white">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Appointments</h5>
                <div className="table-responsive">
                  <table className="table no-wrap user-table mb-0">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium pl-4"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium"
                        >
                          Pet
                        </th>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium"
                        >
                          Hospital
                        </th>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium"
                        >
                          Date andTIme
                        </th>
                        <th
                          scope="col"
                          className="border-0 text-uppercase font-medium"
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
                              <td className="pl-4">1</td>
                              <td>
                                <h5 className="font-medium mb-0">
                                  {a.AppointName}
                                </h5>
                              </td>
                              <td>
                                <span className="text-muted">
                                  {a.AppointPet}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  {a.AppointPhone}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  {a.AppointHospital}
                                </span>
                              </td>
                              <td>
                                <span className="text-muted">
                                  {a.AppointDate}
                                </span>
                                <br />
                                <span className="text-muted">
                                  {a.AppointTime}
                                </span>
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                  onClick={() => {
                                    handleCancel(a._id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>{" "}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                >
                                  <i className="fa fa-check"></i>{" "}
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
export default ViewNewappointment;
