import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Fabrication.css'
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

interface FabricData {
  id: number;
  fabricName: string;
  gsm: string;
  numYarns: number;
  createdOn: string;
  createdBy: string;
  noOfFibre: string;
  countDenier: string;
  status: string;
  yarnCompositions?: any[];
}

const FabricationList: React.FC = () => {
  const navigate = useNavigate();
  const [fabrics, setFabrics] = useState<FabricData[]>([]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const [showSidebar, setShowSidebar] = useState(false);
  
  useEffect(() => {
    const savedData = localStorage.getItem("fabricationData");
    if (savedData) {
      setFabrics(JSON.parse(savedData));
    }
  }, []);

  const handleNewEntryClick = () => {
    navigate("/fabrication-creation");
  };

  const handleRowClick = (fabric: FabricData) => {
    navigate("/fabrication-creation", {
      state: {
        isEditMode: true,
        fabricData: fabric,
      },
    });
  };

  return (
    <div className="fabrication-list-container">
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
      <div className="fabrication-list-header">
        <div className="left-section">
          <div className="breadcrumb">Home &gt; Fabric Composition List</div>
          <h2 className="page-title">Fabric Composition - List View</h2>
        </div>
        <button className="new-entry-button" onClick={handleNewEntryClick}>
          + New Entry
        </button>
      </div>

      <div className="fabrication-list-table">
        <table>
          <thead>
            <tr className="blue-table-header">
              <th>S.No</th>
              <th>Fabric Name</th>
              <th>GSM</th>
              <th>No. of Yarn</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>No. of Fibre</th>
              <th>Count/Denier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {fabrics.map((fabric, index) => (
              <tr
                key={fabric.id}
                onClick={() => handleRowClick(fabric)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{fabric.fabricName}</td>
                <td>{fabric.gsm}</td>
                <td>{fabric.numYarns}</td>
                <td>{fabric.createdOn}</td>
                <td>{fabric.createdBy}</td>
                <td>{fabric.noOfFibre}</td>
                <td>{fabric.countDenier}</td>
                <td>
                  <span
                    className={`status-badge ${
                      fabric.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {fabric.status}
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

export default FabricationList;
