import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaArrowRight } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Master: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
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
      status: "Inactive",
    },
  ];

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleNextClick = (pipelineName: string) => {
    if (pipelineName === "Merchandising") {
      navigate("/masterlistview");
    }
  };
  return (
    <div className="master-wrapper">
      {showSidebar && <Sidebar />}

      <div
        className={`main-content ${
          showSidebar ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="top-bar mb-3">
          <FaBars
            className="toggle-icon"
            style={{ cursor: "pointer" }}
            onClick={toggleSidebar}
          />
        </div>
     
          
        

        <div className="main-area">
          <h2 className="master-title"> List View</h2>

          <table className="table table-striped master-table">
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
                    className="arrow-circle"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleNextClick(p.name)}
                    >
                      <FaArrowRight  className="arrow-icon"/>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Master;
