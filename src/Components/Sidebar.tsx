import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaDollarSign,
  FaProjectDiagram,
  FaTruck,
  FaCogs,
  FaBolt,
  FaUsersCog,
  FaBoxes,
  FaLayerGroup,
  
} from "react-icons/fa";


interface User {
  name: string;
  email: string;
}

const topItems = [
  { icon: <FaTachometerAlt />, label: "Dashboard" },
  { icon: <FaClipboardList />, label: "Enquiry" },
  { icon: <FaDollarSign />, label: "Costing" },
  { icon: <FaLayerGroup />, label: "Sampling" },
  { icon: <FaProjectDiagram />, label: "Planning" },
  { icon: <FaTruck />, label: "Shipping" },
];

const mastersSubItems = [
  { icon: <FaClipboardList />, label: "KYB",path:"/" },
  { icon: <FaBolt />, label: "Admin Master",path:"/master" },
  { icon: <FaUsersCog />, label: "Roles & Responsibilities",path:"/roles-master" },
  { icon: <FaBoxes />, label: "Inventory",path:"" },
];

const Sidebar: React.FC = () => {
  const [showMastersMenu, setShowMastersMenu] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name || "Sam Wheeler",
          email: parsed.email || "samwheeler@example.com",
        });
      } catch {
        setUser({ name: "Sam Wheeler", email: "samwheeler@example.com" });
      }
    }
  }, []);

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar d-flex flex-column justify-content-between">
        <ul className="sidebar-icons mt-3">
          {topItems.map((item, index) => (
            <li key={index} className="sidebar-icon">
              {item.icon}
              <div className="sidebar-label">{item.label}</div>
            </li>
          ))}
          <li
            className="sidebar-icon"
            onClick={() => setShowMastersMenu((prev) => !prev)}
          >
            <FaCogs />
            <div className="sidebar-label">Masters</div>
          </li>
        </ul>
      </div>

      {showMastersMenu && (
        <div className="submenu">
          <div className="submenu-top">
            {mastersSubItems.map((item, index) => (
              <div key={index} className="submenu-item" onClick={() => navigate(item.path)}>
                <span className="me-2">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="submenu-bottom">
            <div className="fw-semibold">{user.name || "Sam Wheeler"}</div>
            <div className="text-muted small">
              {user.email || "samwheeler@example.com"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
