import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { FaArrowDown } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import AxiosService from "../utils/AxiosService";

import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface SeasonDetail {
  _id: string;
  seasonName: string;
  status: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

const EnquiryMasterList: React.FC = () => {
  const [expandSeason, setExpandSeason] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editSeason, setEditSeason] = useState<SeasonDetail | null>(null);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<SeasonDetail | null>(null);
  const [addedSeasonName, setAddedSeasonName] = useState("");
  const [deletedSeasonName, setDeletedSeasonName] = useState("");
  const [updatedSeasonName, setUpdatedSeasonName] = useState("");

  const [newSeason, setNewSeason] = useState({
    seasonName: "",
    status: "Active",
  });

  const [seasonDetails, setSeasonDetails] = useState<SeasonDetail[]>([
    {
      _id: "1", // 👈 changed from number to string
      seasonName: "Spring Summer 2025", // 👈 also make sure key is 'seasonName', not 'name'
      status: "Active",
      createdBy: "Admin",
      createdAt: "24/03/2025", // 👈 use createdAt to match backend field
    },
  ]);
  // const [newSeason, setNewSeason] = useState<Partial<SeasonDetail>>({
  //   name: "",
  //   status: "Active",
  // });

  const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleExpandToggle = () => setExpandSeason(!expandSeason);

  const handleDeleteClick = (id: string) => {
    const item = seasonDetails.find((s) => s._id === id);
    setItemToDelete(item || null);
    setShowDeleteConfirmModal(true);
  };

  const handleModalClose = () => setShowAddModal(false);
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditSeason(null);
  };

  const handleAddNew = () => {
    setShowAddModal(true); // Show Add modal
  };

  const fetchSeasons = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await AxiosService.get("/season", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeasonDetails(response.data); // ✅ Update the state
    } catch (error) {
      console.error("Failed to fetch seasons", error);
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const handleSaveNewSeason = async () => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token);

    if (!token) {
      console.error("Token is missing or invalid.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await AxiosService.post("/season", newSeason, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Season created successfully!");

        // ✅ Add new season to the top of the list
        setSeasonDetails((prev) => [response.data, ...prev]);

        // ✅ Store added season name for the success modal
        setAddedSeasonName(response.data.seasonName);

        // ✅ Close the Add Modal
        setShowAddModal(false);

        // ✅ Show the success modal
        setShowAddSuccessModal(true);

        // ✅ Reset the form state
        setNewSeason({ seasonName: "", status: "Active" });
      }
    } catch (error) {
      console.error("Error saving season:", error);
      toast.error("Failed to save the season.");
    }
  };

  const handleEditClick = (season: any) => {
    setEditSeason(season);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("token");
    setShowEditSuccessModal(true);

    if (!token) {
      console.error("Token is missing or invalid.");
      window.location.href = "/login";
      return;
    }

    if (!editSeason || !editSeason._id) {
      toast.error("No season selected for update.");
      return;
    }

    try {
      const response = await AxiosService.put(
        `/season/${editSeason._id}`,
        {
          seasonName: editSeason.seasonName,
          status: editSeason.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Season updated successfully!");
        // Store updated name for success modal
        setUpdatedSeasonName(response.data.seasonName);
        setSeasonDetails((prev) => {
          const updatedList = prev.filter(
            (item) => item._id !== editSeason._id
          );
          return [response.data, ...updatedList];
        });
        setShowEditModal(false);
        setShowEditSuccessModal(true); // Close the modal
        setEditSeason(null); // Clear form state
        setEditSeason(null); // Refresh table data
      }
    } catch (error) {
      console.error("Error updating season:", error);
      toast.error("Failed to update the season.");
    }
  };

  const handleEditSeasonChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (editSeason) {
      setEditSeason((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleNewSeasonChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setNewSeason((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = async () => {
    if (itemToDelete?._id) {
      try {
        const token = localStorage.getItem("token");
        const response = await AxiosService.delete(
          `/season/${itemToDelete._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 204) {
          // Remove from frontend list
          setSeasonDetails((prev) =>
            prev.filter((season) => season._id !== itemToDelete._id)
          );

          toast.success("Season deleted successfully!");
          setDeletedSeasonName(itemToDelete.seasonName);
          setItemToDelete(null);
          setShowDeleteConfirmModal(false);
          setShowDeleteSuccessModal(true);
        }
      } catch (error) {
        console.error("Error deleting season:", error);
        toast.error("Failed to delete the season.");
      }
    }
  };

  return (
    <div className="px-0 py-4 d-flex  ">
      {showSidebar && <Sidebar />}
      <div
        className={`main-content ${
          showSidebar ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="top-bar mb-3">
          <FaBars
            className="toggle-icon"
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <h4 className="mb-4 fw-bold">Season’s Master </h4>

        <Table hover responsive className="no-border-table">
          <thead className="table-light mt-4 w-100">
            <tr>
              <th>S.No</th>
              <th>Season Name</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created On</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {/* Default Static Row */}
            <tr className="grey-row">
              <td>1</td>
              <td>Season</td>
              <td>
                <strong className="text-success">Active</strong>
              </td>
              <td>Admin</td>
              <td>24/03/2025</td>
              <td>
                <div className="arrow-circle" onClick={handleExpandToggle}>
                  <FaArrowDown className="arrow-icon" />
                </div>
              </td>
            </tr>

            {/* Expanded Section - Shows All Added Seasons */}
            {expandSeason && (
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
                    <div className="p-3 full-width-container">
                      {/* Add New Button */}
                      <div className="d-flex justify-content-end mb-2">
                        <Button
                          className="custom-add-button"
                          size="sm"
                          onClick={handleAddNew}
                        >
                          <FaPlus className="plus-icon" /> Add
                        </Button>
                      </div>

                      {/* Sub-table for Dynamic Seasons */}
                      <Table
                        striped
                        hover
                        responsive
                        className="no-border-table mb-0"
                      >
                        <thead className="table-light">
                          <tr>
                            <th>S.No</th>
                            <th>Season Name</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th>Created On</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {seasonDetails.map((item, index) => (
                            <tr key={item._id || index}>
                              {" "}
                              {/* Use _id here instead of id */}
                              <td>{index + 1}</td>
                              <td>{item.seasonName}</td>{" "}
                              {/* Ensure this is the correct property for the season name */}
                              <td>
                                <strong
                                  className={
                                    item.status === "Active"
                                      ? "text-success"
                                      : "text-danger"
                                  }
                                >
                                  {item.status}
                                </strong>
                              </td>
                              <td>{item.createdBy}</td>
                              <td>
                                {item.createdAt
                                  ? new Date(item.createdAt).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      }
                                    )
                                  : "N/A"}
                              </td>
                              {/* <td>{item.createdAt}</td>{" "} */}
                              {/* Format the created date */}
                              <td onClick={() => handleEditClick(item)}>✏️</td>
                              <td>
                                <span
                                  onClick={() => handleDeleteClick(item._id)}
                                  className="delete-icon"
                                >
                                  -
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Add New Season Modal */}
        <Modal
          className="blur-overlay"
          show={showAddModal}
          onHide={handleModalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Season</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className="season-form-layout ">
              <div className="d-flex gap-3 mb-4 flex-wrap align-items-end">
                <Form.Group className="flex-grow-1">
                  <Form.Label className="form-label-custom">
                    Season Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="seasonName"
                    value={newSeason.seasonName || ""}
                    onChange={handleNewSeasonChange}
                    placeholder="Type here"
                    className="form-control-custom"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="form-label-custom">Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newSeason.status || "Active"}
                    onChange={handleNewSeasonChange}
                    className="form-control-custom"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </div>

              {/* Single Save Button */}
              <div className="text-end">
                <button
                  type="button"
                  className={`save-button ${
                    newSeason.seasonName ? "active" : ""
                  }`}
                  disabled={!newSeason.seasonName}
                  onClick={handleSaveNewSeason}
                >
                  Save
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Success Modal */}
        <Modal
          className="edit-success-modal blur-overlay"
          show={showEditSuccessModal}
          onHide={() => setShowEditSuccessModal(false)}
          centered
        >
          <Modal.Body className="text-center p-4">
            <p className="fw-semibold mb-3">
              Successfully Updated:{" "}
              <span className="text-success fw-bold">{updatedSeasonName}</span>
            </p>
            <Button
              className="ok-btn"
              onClick={() => setShowEditSuccessModal(false)}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>

        {/* Edit Season Modal */}
        <Modal
          show={showEditModal}
          centered
          onHide={handleEditModalClose}
          className="blur-overlay"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Season</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editSeason && (
              <Form
                className="custom-form "
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
              >
                {/* Season Name Field */}
                <Form.Group className="mb-4">
                  <Form.Label className="custom-label">Season Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="seasonName"
                    value={editSeason.seasonName}
                    onChange={handleEditSeasonChange}
                    className="custom-input"
                    placeholder="Type here"
                  />
                </Form.Group>

                {/* Row with Status and Save Button */}
                <div className="d-flex align-items-end justify-content-between gap-3">
                  <Form.Group className="flex-grow-1">
                    <Form.Label className="custom-label">Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={editSeason.status}
                      onChange={handleEditSeasonChange}
                      className="custom-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>

                  <button
                    type="submit"
                    className={`custom-save-button mt-2 ${
                      editSeason.seasonName ? "active" : ""
                    }`}
                    disabled={!editSeason.seasonName}
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* Added Successfully popup */}
        <Modal
          show={showAddSuccessModal}
          onHide={() => setShowAddSuccessModal(false)}
          centered
          backdrop="static"
          dialogClassName="success-modal"
          className="blur-overlay"
        >
          <Modal.Body className="text-center p-4 ">
            <p className="fw-semibold mb-3 ">
              Successfully Added:&nbsp;
              <span className="text-success fw-bold">{addedSeasonName}</span>
            </p>
            <Button
              className="ok-btn"
              onClick={() => setShowAddSuccessModal(false)}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          className="custom-delete-modal blur-overlay"
          show={showDeleteConfirmModal}
          onHide={() => setShowDeleteConfirmModal(false)}
          centered
        >
          <Modal.Body className="text-center p-4">
            <p className="fw-semibold mb-3">
              Are you sure you want to delete <br />
              <span className="text-danger fw-bold">
                {itemToDelete?.seasonName}
              </span>
              ?
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button variant="outline-danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Delete Success Modal */}
        <Modal
          className="delete-success-modal blur-overlay"
          show={showDeleteSuccessModal}
          onHide={() => setShowDeleteSuccessModal(false)}
          centered
        >
          <Modal.Body className="text-center p-4">
            <p className="fw-semibold mb-3">
              Successfully Deleted:{" "}
              <span className="text-success fw-bold">{deletedSeasonName}</span>
            </p>
            <Button
              className="ok-btn"
              onClick={() => setShowDeleteSuccessModal(false)}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EnquiryMasterList;
