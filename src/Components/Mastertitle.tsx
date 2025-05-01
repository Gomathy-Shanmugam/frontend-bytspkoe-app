import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaArrowRight, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

interface RowData {
  id: number;
  name: string;
  createdOn: string;
  createdBy: string;
  status: string;
}

const initialData: RowData[] = [
  { id: 1, name: "Season", createdOn: "24/03/2025", createdBy: "Admin", status: "Active" },
  { id: 2, name: "Product Group", createdOn: "21/03/2025", createdBy: "Admin", status: "Active" },
  { id: 3, name: "Product Item", createdOn: "19/03/2025", createdBy: "Admin", status: "Active" },
  { id: 4, name: "Age Group", createdOn: "12/03/2025", createdBy: "Admin", status: "Active" },
  { id: 5, name: "Gender", createdOn: "06/03/2025", createdBy: "Admin", status: "Active" },
  { id: 6, name: "Port of Origin", createdOn: "02/03/2025", createdBy: "Admin", status: "Active" },
  { id: 7, name: "Port of Discharge", createdOn: "27/02/2025", createdBy: "Admin", status: "Active" },
  { id: 8, name: "Incoterm", createdOn: "25/02/2025", createdBy: "Admin", status: "Active" },
  { id: 9, name: "Preferred Currency", createdOn: "20/02/2025", createdBy: "Admin", status: "Active" },
  { id: 10, name: "Order Quantity", createdOn: "14/02/2025", createdBy: "Admin", status: "Active" },
];

const Mastertitle: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleView = (name: string) => {
    switch (name) {
      case "Product Item":
        navigate("/productitem-list");
        break;
      case "Season":
        navigate("/master-list");
        break;
      default:
        navigate("/master-list");
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="p-4 d-flex">
      {showSidebar && <Sidebar />}

      <div className={`main-content ${showSidebar ? "with-sidebar" : "full-width"}`}>
        <div className="top-bar mb-3">
          <FaBars
            className="toggle-icon"
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <h5 className="mb-4">📌 Enquiry Master - list view</h5>

        <Table striped hover responsive className="custom-table">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr className={index % 2 === 0 ? "grey-row" : "white-row"}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.createdOn}</td>
                  <td>{row.createdBy}</td>
                  <td>
                    <strong className="text-success">{row.status}</strong>
                  </td>
                  <td>
                    <div
                      className="arrow-circle"
                      onClick={() => handleView(row.name)}
                      style={{ cursor: "pointer" }}
                    >
                      <FaArrowRight className="arrow-icon" />
                    </div>
                  </td>
                </tr>
                {expandedRowId === row.id && (
                  <tr>
                    <td colSpan={6}>
                      <div
                        className="p-3"
                        style={{
                          background: "#fef8f8",
                          borderRadius: "10px",
                          boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Mastertitle;
