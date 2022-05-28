import React, { useEffect, useState } from "react";
import "./Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation } from "react-router-dom";
import "../../../assets/css/editform.css";
const axios = require("axios");
const generator = require("generate-password");

function ComplaintView() {
  const [complaintsView, setComplaintsView] = useState(null);

  async function getComplaints() {
    let response = await axios.get("http://localhost:5000/getcomplaints");
    if (response.status === 200) {
      setComplaintsView(response.data.complaints);
    }
  }

  useEffect(() => {
    getComplaints();
  }, []);

  const data = {};
  return (
    <main>
      <div className="main__container">
        <Link to="/dashboard">
          <button className="btn btn-primary" type="button">
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Back To Main Menu
          </button>
        </Link>
        <br></br>
        <br></br>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>UserEmail</th>
              <th>Subject</th>
              <th>Date of Complaint</th>
              <th>Date of Incident</th>
              <th>Location</th>
              <th>Description</th>
              <th>Phone</th>
              <th>userID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaintsView &&
              complaintsView.length > 0 &&
              complaintsView.map((c) => {
                return (
                  <tr rowSpan="5">
                    <td></td>
                    <td>{c.userEmail}</td>
                    <td>{c.subject}</td>
                    <td>{c.doc}</td>
                    <td>{c.doi}</td>
                    <td>{c.location}</td>
                    <td>{c.description}</td>
                    <td>{c.userPhone}</td>
                    <td>{c.userId}</td>
                    <td>{c.status}</td>
                    <td>
                      <button className="btn btn-primary">
                        Animal WelFare <i className="fa fa-forward"></i>
                        <br></br>
                      </button>
                      <button className="btn btn-primary">
                        Forest <i className="fa fa-forward"></i>
                        <br></br>
                      </button>
                      <button className="btn btn-primary">
                        Pet India <i className="fa fa-forward"></i>
                        <br></br>
                      </button>
                      <button className="btn btn-danger">
                        Reject
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </main>
  );
}

export default ComplaintView;
