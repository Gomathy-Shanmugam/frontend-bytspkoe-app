import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import AxiosService from "../utils/AxiosService" // Assuming you have an AxiosService setup

const AddSeasonModal = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSeason, setNewSeason] = useState<{ name: string; status: string }>({ name: "", status: "Active" });

  const handleNewSeasonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSeason((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveNewSeason = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await AxiosService.post(
        "/season",
        { seasonName: newSeason.name },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log("Season created:", response.data);

      // Optional UI actions
      setNewSeason({ name: "", status: "Active" });
      handleModalClose();
    } catch (error) {
      console.error("Error creating season:", error);
      // You can show a toast or alert here
    }
  };

  const handleModalClose = () => {
    setNewSeason({ name: "", status: "Active" });
    setShowAddModal(false); // Close the modal
  };

  return (
    <Modal show={showAddModal} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Season</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="season-form-layout">
          <div className="d-flex gap-3 mb-4 flex-wrap align-items-end">
            <Form.Group className="flex-grow-1">
              <Form.Label className="form-label-custom">Season Name</Form.Label>
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
  );
};

export default AddSeasonModal;
