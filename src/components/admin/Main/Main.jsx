import React, { useEffect, useState } from "react";
import "./Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import "../../../assets/css/editform.css";
const axios = require("axios");
const generator = require("generate-password");

function Main() {
  let history = useHistory();
  const [hospitals, setHospitals] = useState([]);

  async function getHospitals() {
    let response = await axios.get("http://localhost:5000/gethospital");
    if (response.status === 200) {
      setHospitals(response.data.hospitals);
    }
  }

  function getedithospital(id) {
    window.localStorage.setItem("hospitalId", id);
    history.push("/edithospital");
  }
  function deleteHospital(id) {
    let data = {
      hospitalID: id,
    };
    let response = axios
      .post("http://localhost:5000/deletehospital", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getHospitals();
  }, []);

  async function pass() {
    var password = generator.generate({
      length: 10,
      numbers: true,
    });

    console.log(password);
  }

  const data = {};
  return (
    <main>
      <div
        className="modal fade"
        id="editHospitalModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div class="container">
            <div class="card">
              <div class="info">
                {" "}
                <span>Edit Hospital</span> <button id="savebutton">edit</button>{" "}
              </div>
              <div class="forms">
                <div class="inputs">
                  <span>Name</span> <input type="text" />
                </div>
                <div class="inputs">
                  <span>Email</span> <input type="Email" />
                </div>
                <div class="inputs">
                  <span>Phone</span>
                  <input type="tel" minLength="10" maxLength="10" />
                </div>
                <div class="inputs">
                  <span>Address</span> <input type="text" />
                </div>

                <div class="inputs">
                  <span>Pincode</span> <input type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main__container">
        <Link to="/addhospital">
          <button className="btn btn-primary">Add Hospital</button>
        </Link>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hospitals &&
              hospitals.length > 0 &&
              hospitals.map((p) => {
                return (
                  <tr>
                    <td>{p.id}</td>
                    <td>{p.hospitalName}</td>
                    <td>{p.hospitalAddress}</td>
                    <td>{p.hospitalPincode}</td>
                    <td>{p.hospitalPhone}</td>
                    <td>{p.hospitalType}</td>
                    <td colSpan="2">
                      <input
                        type="submit"
                        className="btn btn-success"
                        onClick={() => {
                          getedithospital(p._id);
                        }}
                        value="Edit"
                      />
                      {/* Edit <i className="fa fa-edit"></i>
                      </input> */}
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHospital(p._id);
                        }}
                      >
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

export default Main;
