import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

interface SeasonDetail {
  id: number;
  name: string;
  status: string;
  createdBy: string;
  createdOn: string;
}

const EnquiryMasterList: React.FC = () => {
  const [expandSeason, setExpandSeason] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editSeason, setEditSeason] = useState<SeasonDetail | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<SeasonDetail | null>(null);

  const [seasonDetails, setSeasonDetails] = useState<SeasonDetail[]>([
    {
      id: 1,
      name: "Spring Summer 2025",
      status: "Active",
      createdBy: "Admin",
      createdOn: "24/03/2025",
    },
  ]);
  const [newSeason, setNewSeason] = useState<Partial<SeasonDetail>>({
    name: "",
    status: "Active",
  });

  const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleExpandToggle = () => setExpandSeason(!expandSeason);

  const handleAddNew = () => {
    setNewSeason({ name: "", status: "Active" });
    setShowAddModal(true);
  };

  const handleDeleteClick = (id: number) => {
    const item = seasonDetails.find((s) => s.id === id);
    setItemToDelete(item || null);
    setShowDeleteConfirmModal(true);
  };

  const handleModalClose = () => setShowAddModal(false);
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditSeason(null);
  };

  const handleSaveNewSeason = () => {
    if (!newSeason.name) return; // Prevent undefined names

    const newEntry: SeasonDetail = {
      id: seasonDetails.length + 1,
      name: newSeason.name, // Now guaranteed to be string
      status: newSeason.status || "Active",
      createdBy: "Admin",
      createdOn: new Date().toLocaleDateString("en-GB"), // Format: DD/MM/YYYY
    };

    setSeasonDetails([...seasonDetails, newEntry]);

    setNewSeason({ name: "", status: "Active" });
    setShowAddModal(false);
    setShowSuccessModal(true);
  };

  const handleEditClick = (season: SeasonDetail) => {
    setEditSeason({ ...season });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editSeason) return;

    setSeasonDetails((prev) =>
      prev.map((season) => (season.id === editSeason.id ? editSeason : season))
    );

    setShowEditModal(false);
    setShowEditSuccessModal(true);
  };

  const handleEditSeasonChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (editSeason) {
      setEditSeason((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleNewSeasonChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setNewSeason((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setSeasonDetails((prev) =>
        prev.filter((season) => season.id !== itemToDelete.id)
      );
      setItemToDelete(null);
      setShowDeleteConfirmModal(false);
      setShowDeleteSuccessModal(true);
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
        <h4 className="mb-4 fw-bold">Season’s Master - List View</h4>

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
            <tr className="grey-row">
              <td>1</td>
              <td>Season</td>
              <td>24/03/2025</td>
              <td>Admin</td>
              <td>Active</td>
              <td>
                <div className="arrow-circle" onClick={handleExpandToggle}>
                  <FaArrowRight className="arrow-icon" />
                </div>
              </td>
            </tr>

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
                      <div className="d-flex justify-content-end mb-2">
                        <Button
                          className="custom-add-button"
                          size="sm"
                          onClick={handleAddNew}
                        >
                          <FaPlus className="plus-icon" /> Add New
                        </Button>
                      </div>

                      <Table hover responsive className="no-border-table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>S.No</th>
                            <th>Season Name</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th>Created On</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {seasonDetails.map((item, index) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
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
                              <td>{item.createdOn}</td>
                              <td
                                className="text-center"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEditClick(item)}
                              >
                                ✏️
                              </td>
                              <td>
                                <span
                                  onClick={() => handleDeleteClick(item.id)}
                                  className="delete-icon"
                                >
                                  -
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      {/* ✅ Edit Success Modal */}
                      <Modal
                        className="edit-success-modal"
                        show={showEditSuccessModal}
                        onHide={() => setShowEditSuccessModal(false)}
                        centered
                      >
                        <Modal.Body className="text-center p-4">
                          <p className="fw-semibold mb-3">
                            Successfully Updated:{" "}
                            <span className="text-success fw-bold">
                              {editSeason?.name}
                            </span>
                          </p>
                          <Button
                            className="ok-btn"
                            onClick={() => setShowEditSuccessModal(false)}
                          >
                            OK
                          </Button>
                        </Modal.Body>
                      </Modal>

                      <Modal
                        className="custom-delete-modal"
                        show={showDeleteConfirmModal}
                        onHide={() => setShowDeleteConfirmModal(false)}
                        centered
                      >
                        <Modal.Body className="text-center p-4">
                          <p className="fw-semibold mb-3">
                            Are you sure you want to delete <br />
                            <span className="text-danger fw-bold">
                              {itemToDelete?.name}
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
                            <Button
                              variant="outline-danger"
                              onClick={confirmDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </Modal.Body>
                      </Modal>

                      {/* ✅ Delete Success Modal */}
                      <Modal
                        className="delete-success-modal"
                        show={showDeleteSuccessModal}
                        onHide={() => setShowDeleteSuccessModal(false)}
                        centered
                      >
                        <Modal.Body className="text-center p-4">
                          <p className="fw-semibold mb-3 text-success">
                            Successfully Deleted
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
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Add New Modal */}
        <Modal show={showAddModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Season</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className="season-form-layout">
              <div className="d-flex gap-3 mb-4 flex-wrap align-items-end">
                <Form.Group className="flex-grow-1">
                  <Form.Label className="form-label-custom">
                    Season Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newSeason.name}
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
                  className={`save-button ${newSeason.name ? "active" : ""}`}
                  disabled={!newSeason.name}
                  onClick={handleSaveNewSeason}
                >
                  Save
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Season Modal */}
        <Modal show={showEditModal} onHide={handleEditModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Season</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editSeason && (
              <Form
                className="custom-form"
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
                    name="name"
                    value={editSeason.name}
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
                      editSeason.name ? "active" : ""
                    }`}
                    disabled={!editSeason.name}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EnquiryMasterList;
