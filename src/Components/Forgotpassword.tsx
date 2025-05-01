import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../index.css";
import logo from "../assets/Byspoke-logo.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        { email }
      );
      setMessage(response.data.message || "Reset link sent!");
      setShowVerifyOtp(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset link.");
      setShowVerifyOtp(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    // Redirect to VerifyOtp component with optional email as state
    navigate("/verifyotp", { state: { email } });
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <img src={logo} alt="Byspoke Logo" className="top-left-logo" />
      </div>
      <div className="auth-card">
        {/* Left Panel */}
        <div className="auth-left">
          <h3 className="mb-4">Forgot Password</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>
          {message && (
            <Alert variant="success" className="mt-3">
              {message}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {showVerifyOtp && (
            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>
          )}
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <h2>Hello</h2>
          <p>To stay connected, please return to the login page.</p>
          <Button href="/login" className="auth-button-outline">
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
