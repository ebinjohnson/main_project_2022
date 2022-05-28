import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../user/appointmentstyle.css";
import BookVaccine from "../../assets/images/bookvaccine.png";

const axios = require("axios");
const Vaccine = () => {
  let id = window.localStorage.getItem("id");
  const username = window.localStorage.getItem("username");

  const [vaccineList, setVaccineList] = useState([]);
  function handleLogOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    history.push("/login");
  }

  async function getVaccineList() {
    let response = await axios.get("http://localhost:5000/getvaccinelist");
    if (response.status === 200) {
      setVaccineList(response.data.appointments);
    }
  }

  useEffect(() => {
    getVaccineList();
  }, []);

  const data = {};
  let history = useHistory();

  return (
    <div>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="header">
            <h1>VetCare</h1>
            <h1>Care for Pets</h1>
            <p>
              VetCare was founded with a vision of pairing professional
              management and talented medical teams to deliver high quality
              veterinary care.
            </p>
          </div>
          <div className="back-button">
            <button
              className="btn btn-primary"
              onClick={() => history.push("/userhome")}
            >
              <i class="fa fa-arrow-left"></i>Back
            </button>
          </div>
          <div className="container-new">
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
                <Link to="/userhome">
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
                      <h5 class="card-title text-uppercase mb-0">
                        Vaccine List
                      </h5>
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
                                Hospital Name
                              </th>
                              <th
                                scope="col"
                                class="border-0 text-uppercase font-medium"
                              >
                                Vaccine Name
                              </th>
                              <th
                                scope="col"
                                class="border-0 text-uppercase font-medium"
                              >
                                Vaccine Date
                              </th>
                              <th
                                scope="col"
                                class="border-0 text-uppercase font-medium"
                              >
                                Vaccinating Animal
                              </th>
                              <th
                                scope="col"
                                class="border-0 text-uppercase font-medium"
                              >
                                Vaccine Available
                              </th>
                              <th
                                scope="col"
                                class="border-0 text-uppercase font-medium"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vaccineList &&
                              vaccineList.length > 0 &&
                              vaccineList.map((a) => {
                                {
                                  console.log(a);
                                }
                                return (
                                  <tr>
                                    <td class="pl-4">1</td>
                                    <td>
                                      <h5 class="font-medium mb-0">
                                        {a.hospitalName}
                                      </h5>
                                    </td>
                                    <td>
                                      <span class="text-muted">
                                        {a.vaccineName}
                                      </span>
                                    </td>
                                    <td>
                                      <span class="text-muted">
                                        {a.vaccineDate}
                                      </span>
                                    </td>
                                    <td>
                                      <span class="text-muted">
                                        {a.vaccineAnimal}
                                      </span>
                                    </td>
                                    <td>
                                      <span class="text-muted">
                                        {a.vaccineNumber}
                                      </span>
                                    </td>

                                    <td>
                                      <button
                                        type="button"
                                        class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                      >
                                        <i class="fa fa-check"></i>{" "}
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
        </div>
      </div>
    </div>
  );
};
export default Vaccine;
