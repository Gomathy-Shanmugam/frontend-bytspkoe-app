import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AxiosService from "../utils/AxiosService";
import logo from "../assets/Byspoke-logo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      const res = await AxiosService.post(
        "http://localhost:5000/auth/verify-otp",
        { otp }
        // {
        // headers: {
        //   Authorization: Bearer ${token},
        // },
        // }
      );

      console.log("OTP verification response:", res);
      console.log("OTP verification response data:", res.data);
      const { message, token } = res.data;
      if (token) {
        localStorage.setItem("authToken", token); // ✅ Always store the token if available
      }

      if (res.status === 201) {
        localStorage.setItem("authToken", res.data.token);

        // const token = localStorage.getItem("authToken");
        // console.log("Token in localStorage:", res.data.token);
        toast.success(message || "OTP Verified!");
        navigate("/reset-password");
      } else if (
        res.data.message === "OTP already verified" &&
        res.data.token
      ) {
        localStorage.setItem("authToken", res.data.token);
        toast.success("Your OTP has already been verified.");
        navigate("/reset-password");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err: any) {
      console.error("Error during OTP verification:", err);
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
