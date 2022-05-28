import React, { useState } from "react";
import "./hospitalHome.css";
import Logo from "../../assets/images/Vetcarelogo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Vaccine from "../../assets/images/vaccine.png";
import Calendar from "../../assets/images/calendar.png";
import { Button, Card, Modal } from "react-bootstrap";

const axios = require("axios");
const HospitalHome = () => {
  let history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [vname, setVName] = useState(null);
  const [vanimal, setVAnimal] = useState(null);
  const [vdate, setVDate] = useState(null);
  const [vnumber, setVNumber] = useState(null);

  const handleVName = (event) => {
    setVName(event.target.value);
  };
  const handleVAnimal = (event) => {
    setVAnimal(event.target.value);
  };
  const handleVDate = (event) => {
    setVDate(event.target.value);
  };
  const handleVNumber = (event) => {
    setVNumber(event.target.value);
  };

  const handleSubmit = async () => {
    const hospitalId = window.localStorage.getItem("hospitalId");
    const hospitalName = window.localStorage.getItem("hospitalName");
    const data = {
      hid: hospitalId,
      hname: hospitalName,
      vname: vname,
      vanimal: vanimal,
      vdate: vdate,
      vnumber: vnumber,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/vaccinelist",
        data
      );
      if (response.status === 200) {
        //console.log("Sucessfull");
        history.push("/success");
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  };

  return (
    <div>
      <div className="dashboard">
        <div class="sidenav">
          <img src={Logo} />
          <br />
          <Link to="/hospitalhome">
            <a href="" className="active">
              <i className="fa fa-home" />
              HOME
            </a>
          </Link>
          <Link to="/viewnewappointment">
            <a href="#">
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

        <div class="main">
          <div className="cards">
            <div className="card1">
              <Card style={{ width: "18rem", height: "25rem" }}>
                <Card.Img
                  variant="end"
                  src={Vaccine}
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "center",
                  }}
                />
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Vaaccine</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Vaccine Name"
                      aria-label="default input example"
                      onChange={handleVName}
                      required
                    />
                    <br />
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      required
                      onChange={handleVAnimal}
                    >
                      <option selected>Select Animal</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Parrot">Parrot</option>
                    </select>
                    <br />
                    <input
                      class="form-control"
                      type="date"
                      placeholder="Available Date"
                      min="2021-12-15"
                      aria-label="default input example"
                      required
                      onChange={handleVDate}
                    />
                    <br />
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      placeholder="Number of Vaccines Available"
                      aria-label="default input example"
                      required
                      onChange={handleVNumber}
                    />
                    <br />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Card.Body>
                  <Card.Title>Add Vaccine</Card.Title>
                  <Card.Text>
                    Click the card to add vaccines available in the hospital
                  </Card.Text>
                  <Button variant="primary" onClick={handleShow}>
                    Add Now
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <div className="card2">
              <Card style={{ width: "18rem", height: "25rem" }}>
                <Card.Img
                  variant="top"
                  src={Calendar}
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "center",
                  }}
                />
                <Card.Body>
                  <Card.Title>View Appointments</Card.Title>
                  <Card.Text>
                    See the appointments list and approve the request;
                  </Card.Text>
                  <Link to="/viewnewappointment">
                    {" "}
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HospitalHome;
