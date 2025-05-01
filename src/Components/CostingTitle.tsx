import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

interface Item {
  id: number;
  name: string;
  createdOn: string;
  createdBy: string;
  status: string;
}

const initialData: Item[] = [
  { id: 1, name: "Panel Creation", createdOn: "24/03/2025", createdBy: "Admin", status: "Active" },
  { id: 2, name: "Yarn & Fabric Process", createdOn: "21/03/2025", createdBy: "Admin", status: "Active" },
  { id: 3, name: "Material", createdOn: "19/03/2025", createdBy: "Admin", status: "Active" },
  { id: 4, name: "Labour", createdOn: "12/03/2025", createdBy: "Admin", status: "Active" },
  { id: 5, name: "Garment VAP", createdOn: "06/03/2025", createdBy: "Admin", status: "Active" },
];

const CostingTitle: React.FC = () => {
  const [data] = useState<Item[]>(initialData);
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="table-responsive px-2">
      {showSidebar && <Sidebar />}

      <div className={`main-content ${showSidebar ? "with-sidebar" : "full-width"}`}>
        <div className="top-bar mb-3 d-flex justify-content-between align-items-center">
          <FaBars
            className="toggle-icon"
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <Table striped hover responsive className="custom-table">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>CREATED ON</th>
              <th>CREATED BY</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 !== 0 ? "grey-row" : ""}
                onClick={() => {
                  if (item.name === "Material") {
                    navigate("/costingmaster-list");
                  }
                }}
                style={{ cursor: item.name === "Material" ? "pointer" : "default" }}
              >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.createdOn}</td>
                <td>{item.createdBy}</td>
                <td className="fw-medium text-success">{item.status}</td>
                <td>
                  <div className="arrow-circle">
                    <FaArrowRight className="arrow-icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CostingTitle;
