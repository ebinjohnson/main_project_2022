import React from "react";
import "../forgot_password/email.css";
function Otpverify() {
  return (
    <div className="forgot-password">
      <form class="credit-card">
        <div class="form-header">
          <h4 class="title">Enter the OTP</h4>
        </div>

        <div class="form-body">
          <input
            type="number"
            class="card-number"
            placeholder="enter received otp"
          />

          <button type="submit" class="proceed-btn">
            <a href="#">Proceed</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Otpverify;
