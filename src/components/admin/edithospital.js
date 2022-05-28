import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../../assets/css/editform.css";

const axios = require("axios");
const EditHospital = () => {
  let history = useHistory();
  const hospitalId1 = window.localStorage.getItem("hospitalId");
  const [hname, setHName] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [hemail, setHEmail] = useState(null);
  const [hphone, setHPhone] = useState(null);
  const [haddress, setHAddress] = useState(null);
  const [hpin, setHPin] = useState(null);
  const [htype, setHType] = useState(null);

  async function getHospitals() {
    let data = {
      hospitalId: hospitalId1,
    };

    let response = await axios.post(
      "http://localhost:5000/getHospitalById",
      data
    );
    if (response.status === 200) {
      setHospitals(response.data.hospitals);
    }
  }

  useEffect(() => {
    getHospitals();
  }, []);
  async function handleLogout() {
    window.localStorage.removeItem("hospitalId");
    history.push("/dashboard");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      hospitalId: hospitalId1,
      hname: hname,
      hemail: hemail,
      hphone: hphone,
      haddress: haddress,
      hpin: hpin,
      htype: htype,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/updatehospital",
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
  };
  return (
    <div className="container-contact100">
      <div className="wrap-contact100">
        {hospitals &&
          hospitals.length > 0 &&
          hospitals.map((p) => {
            return (
              <form className="contact100-form validate-form">
                <button
                  class="btn-back"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <i class="fa fa-arrow-left"></i> Back
                </button>

                <span className="contact100-form-title">Add Hospital</span>

                <div className="wrap-input100 validate-input bg1">
                  <span className="label-input100">Name of the hospital*</span>
                  <input
                    className="input100"
                    type="text"
                    name="name"
                    id="hname"
                    defaultValue={p.hospitalName}
                    placeholder={p.hospitalName}
                    onLoad={(e) => setHName(p.hospitalName)}
                    onChange={(e) => setHName(e.target.value)}
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
                    defaultValue={p.hospitalEmail}
                    placeholder={p.hospitalEmail}
                    onChange={(e) => setHEmail(e.target.value)}
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
                    defaultValue={p.hospitalPhone}
                    placeholder={p.hospitalPhone}
                    onChange={(e) => setHPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="wrap-input100 validate-input bg0 rs1-alert-validate">
                  <span className="label-input100">Address *</span>
                  <textarea
                    className="input100"
                    name="address"
                    id="haddress"
                    defaultValue={p.hospitalAddress}
                    placeholder={p.hospitalAddress}
                    onChange={(e) => setHAddress(e.target.value)}
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
                    defaultValue={p.hospitalPincode}
                    placeholder={p.hospitalPincode}
                    onChange={(e) => setHPin(e.target.value)}
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
                      onChange={(e) => setHType(e.target.value)}
                      required
                    >
                      <option defaultValue={p.hospitalType}>
                        {p.hospitalType}
                      </option>
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
            );
          })}
        ;
      </div>
    </div>
  );
};
export default EditHospital;
