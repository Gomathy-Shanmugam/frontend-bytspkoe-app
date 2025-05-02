import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './responsiveness.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fontsource/poppins'; 



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
