import React, { useState, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Byspoke-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

interface RegisterFormData {
  name: string;
  email: string;
  role: string;
  password: string;
  cpassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  cpassword?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    role: "users",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showCPassword, setShowCPassword] = useState(false); // State to toggle confirm password visibility

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
    if (!formData.cpassword)
      newErrors.cpassword = "Confirm your password";
    if (formData.password !== formData.cpassword)
      newErrors.cpassword = "Passwords do not match";
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
      const res = await AxiosService.post("/auth/signup", formData);
      if (res.status === 200 || res.status === 201) {
        toast.success('Signup Successful', res.data.message);
        navigate("/login");
      } else {
        toast.error('Signup failed! try again', res.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "signup error");
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

            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type={showCPassword ? "text" : "password"} // Toggle confirm password visibility
                placeholder="Confirm Password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                isInvalid={!!errors.cpassword}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowCPassword(!showCPassword)} // Toggle show/hide confirm password
                style={{ cursor: "pointer" }}
              >
                {showCPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
              <Form.Control.Feedback type="invalid">
                {errors.cpassword}
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
          <h2>Hello, Friend!</h2>
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
