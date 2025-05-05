import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/Byspoke-logo.png";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No token found. Please verify OTP again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/reset-password",
        { newPassword, cPassword: confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password reset successful!");
      localStorage.removeItem("authToken"); // Optional cleanup
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Error resetting password.";
      toast.error(errorMsg);
      console.error("Reset Password Error:", error);
    } finally {
      setIsLoading(false);
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
            <div className="position-relative">
              <input
                type={showNewPassword ? "text" : "password"} // Toggle password visibility
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowNewPassword(!showNewPassword)} // Toggle new password visibility
                style={{ cursor: "pointer" }}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
            </div>

            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                style={{ cursor: "pointer" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
            </div>

            <button type="submit" className="reset-btn" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset"}
            </button>
          </form>
        </div>

        <div className="reset-right">
          <h2>Hello, Again!</h2>
          <p>Please enter your new password to regain access.</p>
          <a href="/login" className="signin-btn">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
