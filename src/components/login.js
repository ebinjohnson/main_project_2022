import React, { useState } from "react";
import "./style.css";
import SignInImg from "../assets/images/signup-image.svg";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios");
const Login = () => {
  
  let history = useHistory();
  const [email, setEmail] = useState(null);
  const [pass, setPassword] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      email: email,
      password: pass,
    };

    try {
      const response = await axios.post("http://localhost:5000/login", data);
      if (response.status === 200) {
        window.localStorage.setItem("token", "Bearer " + response.data.token);
        window.localStorage.setItem("username", response.data.username);
        window.localStorage.setItem("id", response.data.id);
        window.localStorage.setItem("useremail", response.data.useremail);
        window.localStorage.setItem("userphone", response.data.userphone);
        if (response.data.role === "admin") {
          history.push("/dashboard");
        } else {
          history.push("/userhome");
        }
      } else {
        alert("failed");
      }
    } catch (error) {
      alert("Error");
    }
  };
  return (
    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <h3>Vetcare</h3>
              <figure>
                <img src={SignInImg} alt="sign in image" />
              </figure>
              <Link to="/Register">
                <a className="signup-image-link">Create An Account</a>
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form className="register-form" id="login-form">
                <div className="form-group">
                  <label for="email">
                    <i className="fa fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    onChange={handleEmail}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="password">
                    <i className="fa fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handlePassword}
                    required
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="button"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    onClick={handleSubmit}
                    value="Log in"
                  />
                </div>
                <div>
                  <Link to="/Register">
                    <a className=" ">Forgot Password</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
