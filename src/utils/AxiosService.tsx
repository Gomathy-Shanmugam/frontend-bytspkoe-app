import axios from "axios";

const AxiosService = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to decode JWT and check if it's expired
const isTokenExpired = (token: string): boolean => {  // Explicitly typing token as string
  if (!token) return true;
  
  // Split the token into parts and decode the payload (middle part)
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));  // Decode the base64 string

  const currentTime = Date.now() / 1000; // Get current time in seconds
  return decoded.exp < currentTime;
};

// Intercept request to attach token
AxiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Check if token is expired before attaching it
    if (isTokenExpired(token)) {
      // Token expired, handle token refresh or logout
      localStorage.removeItem('token');
      // Optionally trigger a refresh token request here if using refresh tokens
      // For now, redirect or show a login prompt
      window.location.href = '/login';  // Or use history.push('/login') if using react-router
      return Promise.reject("Token expired");
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercept responses to handle errors globally
AxiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error response:', error.response);
      if (error.response.status === 500) {
        console.error('Server error occurred:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);


export default AxiosService;
