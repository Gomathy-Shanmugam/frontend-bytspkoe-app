import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/Byspoke-logo.png";


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/reset-password", {
        password: newPassword,
      });

      alert("Password reset successful!");
    } catch (error) {
      console.error(error);
      alert("Error resetting password.");
    }
  };

  return (
    <div className="reset-container">
      <div className="logo-container">
        <img src={logo} alt="Byspoke Logo" className="top-left-logo" />
      </div>

      <div className="reset-box">
        <div className="reset-left">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="reset-btn">Reset</button>
          </form>
        </div>

        <div className="reset-right">
          <h2>Hello, Again!</h2>
          <p>Please enter your new password to regain access.</p>
          <a href="/signin" className="signin-btn">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
