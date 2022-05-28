import React, { useEffect, useState } from "react";
import "./Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation } from "react-router-dom";
const axios = require("axios");

function UserMain() {
  const [userdetails, setUserDetails] = useState([]);

  async function getUserDetails() {
    let response = await axios.get("http://localhost:5000/getusers");
    if (response.status === 200) {
      setUserDetails(response.data.userdetails);
    }
  }

  async function handleBlock(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/deleteUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleActivate(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/activateUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const data = {};
  return (
    <main>
      <div className="main__container">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userdetails &&
              userdetails.length > 0 &&
              userdetails.map((u) => {
                return (
                  <tr>
                    <td>
                      <i className="fa fa-user"></i>
                    </td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.status}</td>
                    <td colSpan="2">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleBlock(u._id);
                        }}
                      >
                        Block
                      </button>{" "}
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          handleActivate(u._id);
                        }}
                      >
                        Activate
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

export default UserMain;
