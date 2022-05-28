import React, { useEffect, useState } from "react";
import "./userprofilestyle.css";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const axios = require("axios");
const Userprofile = () => {
  const username = window.localStorage.getItem("username");
  const userEmail = window.localStorage.getItem("useremail");
  const userPhone = window.localStorage.getItem("userphone");

  const [show, setShow] = useState(false);
  const [cupass, setCuPass] = useState(null);
  const [newpass, setNewPass] = useState(null);
  const [cnpass, setCnPass] = useState(null);
  //   function handleLogOut() {
  //     window.localStorage.removeItem("token");
  //     window.localStorage.removeItem("username");
  //     history.push("/login");
  //   }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function handleChangePassword(e) {
    if (newpass === cnpass) {
      let data = {
        username: username,
        oldPassword: cupass,
        password: newpass,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/changepassword",
          data
        );
        if (response.status === 200) {
          alert("Password Updated");
          handleClose();
        } else {
          alert("Failed!! Category Already Exists");
        }
      } catch (e) {
        alert("Error");
      }
    } else {
      alert("Password Mismatch");
    }

    handleClose();
  }

  return (
    <div className="container rounded bg-white mt-5">
      <div className="row">
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
              width="90"
            />
            <span className="font-weight-bold">{username}</span>
            <span className="text-black-50">{userEmail}</span>
            <span>{userPhone}</span>
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex flex-row align-items-center back">
                <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                <Link to="/userhome">
                  <h6>Back to home</h6>
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={username}
                  contentEditable="true"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={userEmail}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <input
                  type="tel"
                  className="form-control"
                  defaultValue={userPhone}
                  maxLength="10"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-8">
                <h6>Change Password</h6>
              </div>
              <div className="col-md-4" onClick={handleShow}>
                <i className="fa fa-edit"></i>
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <Form.Control
                    type="password"
                    placeholder="Current password"
                    onChange={(e) => setCuPass(e.target.value)}
                    required
                  />
                  <br />
                  <Form.Control
                    type="password"
                    placeholder=" New Password"
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                  />
                  <br />
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setCnPass(e.target.value)}
                    required
                  />
                  <br />
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="mt-5 text-right">
              <button className="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
