import React, { useState, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Byspoke-logo.png";

interface RegisterFormData {
  name: string;
  email: string;
  role: string;
  password: string;
  cPassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  cPassword?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    role: "",
    password: "",
    cPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.cPassword)
      newErrors.cPassword = "Confirm your password";
    if (formData.password !== formData.cPassword)
      newErrors.cPassword = "Passwords do not match";
    return newErrors;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      const { cPassword, ...dataToSend } = formData;
      const res = await AxiosService.post("/auth/signup", dataToSend);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(dataToSend));
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Byspoke Logo" className="top-left-logo" />
      </div>
      <div className="register-container">
        <div className="register-left">
          <h3 className="mb-4">Sign Up</h3>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="merchandizing">Merchandizing</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="cPassword" // Changed to match backend field
                value={formData.cPassword} // Should match the state value
                onChange={handleChange}
                isInvalid={!!errors.cPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
              Register
            </Button>

            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </p>
          </Form>
        </div>

        <div className="register-right">
          <h2>Hello</h2>
          <p>Join our textile workforce in a few clicks.</p>
          <Link to="/login">
            <Button variant="light" className="mt-3">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
