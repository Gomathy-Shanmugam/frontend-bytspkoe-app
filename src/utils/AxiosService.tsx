import axios from "axios";

const AxiosService = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

AxiosService.interceptors.request.use((config)=>{
  const token= localStorage.getItem('token'); //store token after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default AxiosService;