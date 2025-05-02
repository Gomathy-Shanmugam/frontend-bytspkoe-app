import React, { useState, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import logo from "../assets/Byspoke-logo.png";

interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (formData: LoginFormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationErrors = validate(formProps);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await AxiosService.post("/auth/login", formProps);
      console.log(response); 
      if (response.status === 200 || response.status === 201){
        toast.success(response.data.message);
        localStorage.setItem("access_token", response.data.access_token); // Store the token
        navigate("/master");
      }else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
        console.error(error); 
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Byspoke Logo" className="top-left-logo" />
      </div>
      <div className="login-card">
        <div className="login-left">
          <h2 className="signin-title">Sign In</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <button type="submit" className="login-button-primary">
              Sign In
            </button>

            <div className="links">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Form>
        </div>

        <div className="login-right">
          <h2>Hello</h2>
          <p>
            Sign in with your personal details to access all features.
          </p>
          <Link to="/register">
            <button className="login-button-outline">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
