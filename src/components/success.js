import React from "react";
import { Link } from "react-router-dom";
import SuccessImg from "../assets/images/success.gif";
import "./style.css";

const Success = () => {
  return (
    <div className="success-container">
      <figure>
        <img src={SuccessImg} alt="Succesimg" />
      </figure>
      <div>Registration Successfull</div>
      <Link to="/login">
        <a className="signup-image-link">Sign In</a>
      </Link>
    </div>
  );
};
export default Success;
