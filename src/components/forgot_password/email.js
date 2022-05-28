import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../forgot_password/email.css";

function Email() {
  let history = useHistory();
  const [mobile, setMobile] = useState();
  const handleMob = (event) => {
    setMobile(event.target.value);
  };
  const sendOtp = async () => {
    const data = {
      mobile: mobile,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/otpAuthentication",
        data
      );
      if (response.status === 200) {
        alert("Otp Sent");
        history.push("/otpverify");
      } else {
        alert("Invalid Number");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="forgot-password">
      <form class="credit-card">
        <div class="form-header">
          <h4 class="title">Enter Phone Number Associated With Account</h4>
        </div>

        <div class="form-body">
          <input
            type="number"
            class="card-number"
            placeholder="enter mobile number"
            maxLength="10"
            onChange={handleMob}
          />

          <button
            type="submit"
            class="proceed-btn"
            onClick={() => {
              sendOtp();
            }}
          >
            <a href="#">Proceed</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Email;
