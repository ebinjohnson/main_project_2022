import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import MapPicker from "react-google-map-picker";
import "../../assets/css/complaintform.css";
import StopAbuse from "../../assets/images/harrassment-banner.jpg";

const axios = require("axios");
const DefaultLocation = { lat: 9.528543910478339, lng: 76.822264842330576 };
const DefaultZoom = 10;

function ComplaintForm() {
  let id = window.localStorage.getItem("id");
  let useremail = window.localStorage.getItem("useremail");
  let userphone = window.localStorage.getItem("userphone");

  const data = {};
  let history = useHistory();

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  const [c_doi, setC_Doi] = useState(null);
  const [c_sub, setC_Sub] = useState(null);
  let [c_lat, setC_Lat] = useState(null);
  let [c_lng, setC_Lng] = useState(null);
  let [c_location, setC_Location] = useState(null);
  const [c_desc, setC_Desc] = useState(null);

  const handleDoi = (event) => {
    setC_Doi(event.target.value);
  };
  const handleSub = (event) => {
    setC_Sub(event.target.value);
  };
  const handleLat = (event) => {
    setC_Lat(event.target.value);
  };
  const handleLng = (event) => {
    setC_Lng(event.target.value);
  };
  const handleLocation = (event) => {
    setC_Location(event.target.value);
  };
  const handleDesc = (event) => {
    setC_Desc(event.target.value);
  };
  // useEffect(() => {
  //   getHospitals();
  // }, []);
  const handleSubmit = async () => {
    if (c_location == null) {
      c_location = location.lat + "," + location.lng;
    }
    const data = {
      c_email: useremail,
      c_phone: userphone,
      c_date: c_doi,
      c_sub: c_sub,
      c_location: c_location,
      c_desc: c_desc,
      id: id,
    };
    if (
      useremail != null ||
      userphone != null ||
      c_doi != null ||
      c_sub != null ||
      c_location != null ||
      c_desc != null
    ) {
      try {
        const response = await axios.post(
          "http://localhost:5000/complaints",
          data
        );
        if (response.status === 200) {
          console.log("Sucessfull");
          history.push("/userhome");
        } else {
          console.log("Failed");
        }
      } catch (e) {
        console.log("Error");
      }
    } else {
      alert("please fill out the fields");
    }
  };
  return (
    <div>
      <div className="c-container-contact100">
        <div className="c-contact100-map"></div>

        <div className="c-wrap-contact100">
          <div className="c-contact100-form-title">
            <span className="c-contact100-form-title-1">Complaint Form</span>

            <span className="c-contact100-form-title-2">
              Please send us details about the animal harrassment incident you
              would like to report. Our Complaint Center will analyze your
              complaint and take the appropriate measures
            </span>
          </div>
          <div className="back-button">
            <button
              className="btn btn-primary"
              style={{ width: "150px" }}
              onClick={() => history.push("/userhome")}
            >
              <i class="fa fa-arrow-left"></i>Back To Main
            </button>
          </div>
          <form className="c-contact100-form validate-form">
            <div className="c-wrap-input100 validate-input">
              <span className="c-label-input100">Date of Incident:</span>
              <input
                className="c-input100"
                type="Date"
                name="date"
                placeholder="Select the date"
                max="2022-05-12"
                onChange={handleDoi}
              />

              <br></br>
            </div>

            <div className="c-wrap-input100 validate-input">
              <span className="c-label-input100">Subject:</span>
              <input
                className="c-input100"
                type="text"
                name="subject"
                placeholder="Enter Subject in one sentence"
                onChange={handleSub}
              />
              <span className="c-focus-input100"></span>
              <br></br>
            </div>
            <button onClick={handleResetLocation}>Reset Location</button>
            <div className="c-wrap-input100 validate-input">
              <div className="map-location" style={{ width: "400px" }}>
                <span className="c-label-input100">Location of Incident:</span>
                Latitude:{" "}
                <input
                  type="text"
                  value={location.lat}
                  onChange={handleLat}
                  disabled
                />
                Longitude:{" "}
                <input
                  type="text"
                  value={location.lng}
                  onChange={handleLng}
                  disabled
                />
                <MapPicker
                  defaultLocation={defaultLocation}
                  zoom={zoom}
                  mapTypeId="roadmap"
                  style={{ height: "200px" }}
                  onChangeLocation={handleChangeLocation}
                  onChangeZoom={handleChangeZoom}
                  apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
                />
                <br></br>
                Or
                <br></br>
                {/* <button
                  onClick={() => {
                    getLocation();
                  }}
                  className="btn btn-primary"
                >
                  Get Current Location
                </button> */}
                <input
                  className="c-input100"
                  type="text"
                  name="subject"
                  placeholder="Enter Location manually"
                  onChange={handleLocation}
                />
              </div>
            </div>

            <div className="c-wrap-input100 validate-input">
              <span className="c-label-input100">Description:</span>
              <textarea
                className="c-input100"
                name="message"
                placeholder="Detailed Description"
                onChange={handleDesc}
              ></textarea>
            </div>
            {/* <div className="c-wrap-input100 validate-input">
              <span className="c-label-input100">Any Files to attach:</span>
              <input
                className="c-input100"
                type="file"
                name="location"
                placeholder="Any files for proof"
              />
              <span className="c-focus-input100"></span>
              <br></br>
            </div> */}

            <div className="c-container-contact100-form-btn">
              <input
                type="button"
                value="Send Complaint"
                className="c-contact100-form-btn"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>

      <div id="dropDownSelect1"></div>
    </div>
  );
}
export default ComplaintForm;
