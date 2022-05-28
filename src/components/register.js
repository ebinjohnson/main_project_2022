import React, { useState } from "react";
import "./style.css";
import SignupImg from "../assets/images/signup-image.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const axios = require("axios");
const Register = () => {
  let history = useHistory();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [pass, setPassword] = useState(null);
  const [cnpass, setCnPassword] = useState(null);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleCnPassword = (event) => {
    setCnPassword(event.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      password: pass,
    };
    if (name == null || email == null || phone == null || pass == null) {
      if (pass === cnpass) {
        try {
          const response = await axios.post(
            "http://localhost:5000/register",
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
      } else {
        // document.getElementById("pass").focus();
      }
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label for="name">
                    <i className="fa fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    pattern="^[-a-zA-Z]+$"
                    title="Name should be in lowercase and contain only alphabets. eg:ebin"
                    onChange={handleName}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="email">
                    <i className="fa fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={handleEmail}
                    title="eg:ebin@gmail.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="phone">
                    <i className="fa fa-phone"></i>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Your Phone Number"
                    onChange={handlePhone}
                    title="Phone number without country code. Length must be 10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="pass">
                    <i className="fa fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    onChange={handlePassword}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  />
                </div>

                <div className="form-group">
                  <label for="re-pass">
                    <i className="fa fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    onChange={handleCnPassword}
                    placeholder="Repeat your password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={SignupImg} alt="sign up image" />
              </figure>
              <Link to="/login">
                <a className="signup-image-link">I am already member-Sign In</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
