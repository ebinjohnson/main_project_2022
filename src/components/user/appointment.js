import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import "../user/appointmentstyle.css";
import SideImg from "../../assets/images/sideappointment.png";

const axios = require("axios");
function Appointment() {
  let id = window.localStorage.getItem("id");

  const [hospitals, setHospitals] = useState([]);

  async function getHospitals() {
    let response = await axios.get("http://localhost:5000/gethospital");
    if (response.status === 200) {
      setHospitals(response.data.hospitals);
    }
  }

  useEffect(() => {
    getHospitals();
  }, []);

  const data = {};
  let history = useHistory();

  const [aname, setAName] = useState(null);
  const [aphone, setAPhone] = useState(null);
  const [apet, setAPet] = useState(null);
  const [ahospital, setAHospital] = useState(null);
  const [adate, setADate] = useState(null);
  const [atime, setATime] = useState(null);

  const handleName = (event) => {
    setAName(event.target.value);
  };
  const handlePhone = (event) => {
    setAPhone(event.target.value);
  };
  const handlePet = (event) => {
    setAPet(event.target.value);
  };
  const handleHospital = (event) => {
    setAHospital(event.target.value);
  };
  const handleDate = (event) => {
    setADate(event.target.value);
  };
  const handleTime = (event) => {
    setATime(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      aname: aname,
      aphone: aphone,
      apet: apet,
      ahospital: ahospital,
      adate: adate,
      atime: atime,
      id: id,
    };
    if (
      aname != null ||
      aphone != null ||
      apet != null ||
      ahospital != null ||
      adate != null ||
      atime != null
    ) {
      try {
        const response = await axios.post(
          "http://localhost:5000/appointments",
          data
        );
        if (response.status === 200) {
          //console.log("Sucessfull");
          history.push("/userhome");
        } else {
          console.log("Failed");
        }
      } catch (e) {
        console.log("Error");
      }
    } else {
      alert("Fields are empty");
    }
  };
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
            <img src={SideImg} alt="BOOK AN APPOINTMENT" />
            <div className="booking-form">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your Name"
                    onChange={handleName}
                  />
                  <span className="form-label">Name</span>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Enter your Phone number"
                    onChange={handlePhone}
                  />
                  <span className="form-label">Phone</span>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={handlePet}
                    required
                  >
                    <option value="" selected>
                      Select your pet
                    </option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Parrot">Parrot</option>
                  </select>
                  <span className="select-arrow"></span>
                  <span className="form-label">Choose your pet</span>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={handleHospital}
                    required
                  >
                    <option value="" selected>
                      Select Hospital
                    </option>
                    {hospitals &&
                      hospitals.length > 0 &&
                      hospitals.map((p) => {
                        return (
                          <option value={p.hospitalName}>
                            {p.hospitalName}
                          </option>
                        );
                      })}
                  </select>
                  <span className="select-arrow"></span>
                  <span className="form-label">Select Hospital</span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="date"
                        min="2022-04-05"
                        onChange={handleDate}
                        required
                      />
                      <span className="form-label">Pickup Date</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={handleTime}
                        required
                      >
                        <option value="" selected>
                          Select Passenger Numbers
                        </option>
                        <option value="10:00AM-11:00AM">
                          10:00 AM-11:00 AM
                        </option>
                        <option value="11:00AM-12:00PM">
                          11:00 AM-12:00 PM
                        </option>
                        <option value="12:00PM-01:00PM">
                          12:00 PM-01:00 PM
                        </option>
                      </select>
                      <span className="select-arrow"></span>
                      <span className="form-label">Time</span>
                    </div>
                  </div>
                </div>
                <div className="form-btn">
                  <input
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                    value="Book Now"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appointment;
