import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaCommentDots, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Master: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const pipelines = [
    {
      id: 1,
      name: "Merchandising",
      createdOn: "12/02/2025",
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Production",
      createdOn: "12/03/2025",
      createdBy: "User1",
      status: "Inactive",
    },
    {
      id: 3,
      name: "CRM",
      createdOn: "12/04/2025",
      createdBy: "User2",
      status: "Active",
    },
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNextClick = (pipelineName: string) => {
    if (pipelineName === "Merchandising") {
      navigate("/master-list");
    }
  };
  return (
    <div className="master-wrapper">
      {sidebarVisible && <Sidebar />}

      <div className="main-area">
        <div className="topbar">
          <FaBars className="menu-icon" onClick={toggleSidebar} />
          <div className="top-icons">
            <FaBell className="top-icon" />
            <FaCommentDots className="top-icon" />
            <FaUserCircle className="top-icon" />
          </div>
        </div>

        <h2 className="master-title">✨ List View</h2>

        <table className="master-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Pipeline</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            {pipelines.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td>{p.createdOn}</td>
                <td>{p.createdBy}</td>
                <td>{p.status}</td>
                <td>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNextClick(p.name)}
                  >
                    ➡️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Master;
