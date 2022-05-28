import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../../assets/css/main.css";
import "../../assets/css/util.css";

const axios = require("axios");
const Addhospital = () => {
  let history = useHistory();

  const [hname, setHName] = useState(null);
  const [hemail, setHEmail] = useState(null);
  const [hphone, setHPhone] = useState(null);
  const [haddress, setHAddress] = useState(null);
  const [hpin, setHPin] = useState(null);
  const [htype, setHType] = useState(null);

  const handleName = (event) => {
    setHName(event.target.value);
  };
  const handleEmail = (event) => {
    setHEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setHPhone(event.target.value);
  };
  const handleAddress = (event) => {
    setHAddress(event.target.value);
  };
  const handlePin = (event) => {
    setHPin(event.target.value);
  };
  const handleType = (event) => {
    setHType(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      hname: hname,
      hemail: hemail,
      hphone: hphone,
      haddress: haddress,
      hpin: hpin,
      htype: htype,
    };
    if (
      hname.length != 0 ||
      hemail.length != 0 ||
      hphone.length != 0 ||
      haddress.length != 0 ||
      hpin.length != 0
    ) {
      try {
        const response = await axios.post(
          "http://localhost:5000/addhospital",
          data
        );
        if (response.status === 200) {
          //console.log("Sucessfull");
          history.push("/dashboard");
        } else {
          console.log("Failed");
        }
      } catch (e) {
        console.log("Error");
      }
    } else {
      alert("Please Fill all the fields");
    }
  };
  return (
    <div className="container-contact100">
      <div className="wrap-contact100">
        <form className="contact100-form validate-form">
          <Link to="/dashboard">
            <button class="btn-back">
              <i class="fa fa-arrow-left"></i> Back
            </button>
          </Link>
          <span className="contact100-form-title">Add Hospital</span>

          <div className="wrap-input100 validate-input bg1">
            <span className="label-input100">Name of Hospital*</span>
            <input
              className="input100"
              type="text"
              name="name"
              id="hname"
              placeholder="Enter Name"
              onChange={handleName}
              required
            />
          </div>

          <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
            <span className="label-input100">Email *</span>
            <input
              className="input100"
              type="email"
              name="email"
              id="hemail"
              placeholder="Enter Email "
              onChange={handleEmail}
              required
            />
          </div>

          <div className="wrap-input100 bg1 rs1-wrap-input100">
            <span className="label-input100">Phone</span>
            <input
              className="input100"
              type="tel"
              name="phone"
              id="hphone"
              maxLength="10"
              minLength="10"
              placeholder="Enter Number Phone"
              onChange={handlePhone}
              required
            />
          </div>

          <div className="wrap-input100 validate-input bg0 rs1-alert-validate">
            <span className="label-input100">Address *</span>
            <textarea
              className="input100"
              name="address"
              id="haddress"
              placeholder="Address here..."
              onChange={handleAddress}
              required
            ></textarea>
          </div>
          <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
            <span className="label-input100">Pincode *</span>
            <input
              className="input100"
              type="number"
              name="pincode"
              id="hpin"
              minLength="6"
              maxLength="6"
              placeholder="Enter Pincode "
              onChange={handlePin}
              required
            />
          </div>
          <div className="wrap-input100 bg1 rs1-wrap-input100">
            <span className="label-input100">Type of Hospital *</span>
            <div>
              <select
                className="btn btn-secondary dropdown-toggle"
                name="service"
                id="htype"
                onChange={handleType}
                required
              >
                <option value="NA">Please choose</option>
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
              <div className="dropDownSelect2"></div>
            </div>
          </div>
          <div className="container-contact100-form-btn">
            <button
              type="button"
              className="contact100-form-btn "
              id="hsubmit"
              onClick={handleSubmit}
            >
              <span>
                Submit
                <i
                  className="fa fa-long-arrow-right m-l-7"
                  aria-hidden="true"
                ></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Addhospital;
