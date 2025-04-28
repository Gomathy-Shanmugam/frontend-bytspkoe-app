import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import logo from "../assets/Byspoke-logo.png";

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      const res = await AxiosService.post("/auth/verify-otp", { otp });
      if (res.status === 200) {
        toast.success("OTP Verified!");
        navigate("/reset-password");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Byspoke Logo" className="top-left-logo" />
      </div>
      <div className="verify-container">
        <div className="verify-left">
          <h3>Verify OTP</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-3"
            />
            <Button type="submit" className="btn-primary w-100">
              Verify OTP
            </Button>
          </Form>
        </div>
        <div className="verify-right">
          <h2>Hello Again!</h2>
          <p>
            Enter the OTP sent to your registered email to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
