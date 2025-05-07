import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar"; 

const data = [
  {
    id: 1,
    section: "Enquiry Registration",
    createdOn: "12/02/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 2,
    section: "Research & Development",
    createdOn: "09/02/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 3,
    section: "Costing",
    createdOn: "25/02/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 4,
    section: "Sampling Development & Despatch",
    createdOn: "01/03/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 5,
    section: "Production Planning & Scheduling",
    createdOn: "14/03/2025",
    createdBy: "Admin",
    status: "Inactive",
  },
  {
    id: 6,
    section: "Bill of Material",
    createdOn: "22/02/2025",
    createdBy: "Admin",
    status: "Inactive",
  },
  {
    id: 7,
    section: "Techpack",
    createdOn: "12/04/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 8,
    section: "Pre-Order Draft",
    createdOn: "12/01/2025",
    createdBy: "Admin",
    status: "Inactive",
  },
];

const RolesMasterlistview: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  const handleNextClick = (section: string) => {
    const routes: Record<string, string> = {
      "Enquiry Registration": "/roles-page",
      "Research & Development": "/research-development",
      Costing: "/costing-title",
      "Sampling Development & Despatch": "/sampling-despatch",
      "Production Planning & Scheduling": "/production-scheduling",
      "Bill of Material": "/bill-of-material",
      Techpack: "/techpack",
      "Pre-Order Draft": "/preorder-draft",
    };

    if (routes[section]) {
      navigate(routes[section]);
    } else {
      console.warn("No route defined for:", section);
    }
  };

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}

      <div
        className={`main-content ${
          showSidebar ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="top-bar">
          <FaBars
            className="toggle-icon"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>
        <h2 className="page-title mb-3">Master List</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>System Section</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "grey-row" : "white-row"}
              >
                <td>{index + 1}</td>
                <td>{item.section}</td>
                <td>{item.createdOn}</td>
                <td>{item.createdBy}</td>
                <td>{item.status}</td>
                <td>
                  <div
                    className="next-icon"
                    onClick={() => handleNextClick(item.section)}
                  >
                    <FaBars />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesMasterlistview;
