import React ,{ useState }from 'react'
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Enquiry() {
    const [showSidebar, setShowSidebar] = useState(false);
      const toggleSidebar = () => setShowSidebar(!showSidebar);
  return (
    <div>
      {showSidebar && <Sidebar />}
        <div
          className={`main-content ${
            showSidebar ? "with-sidebar" : "full-width"
          }`}
        >
          <div className="top-bar mb-3">
            <FaBars
              className="toggle-icon"
              onClick={toggleSidebar}
              style={{ cursor: "pointer" }}
            />
          </div>
          </div>
    </div>
  )
}

export default Enquiry
