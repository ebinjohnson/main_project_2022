import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HospitalPng from "../../assets/images/hospital.jpg";
import "./hospitallogin.css";

const axios = require("axios");
const HospitalLogin = () => {
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  async function handleHospital() {
    let response = await axios.post("http://localhost:5000/hospitalLogin", {
      email: email,
      phone: phone,
    });
    if (response.status === 200) {
      window.localStorage.setItem("hospitalId", response.data.id);
      window.localStorage.setItem("hospitalName", response.data.hospitalName);
      history.push("/hospitalhome");
    } else {
      alert("Incorrect details");
    }
  }

  let history = useHistory();

  return (
    <div>
      <form>
        <div className="imgcontainer1">
          <center>
            <h3>Hospital Login</h3>
          </center>
          <img src={HospitalPng} alt="Avatar" className="avatar1" />
        </div>

        <div className="container1">
          <input
            type="email"
            placeholder="Enter Email"
            name="uname"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="tel"
            placeholder="Enter Password"
            name="psw"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <input
            type="button"
            className="btn btn-primary"
            value="Login"
            onClick={() => {
              handleHospital();
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default HospitalLogin;
