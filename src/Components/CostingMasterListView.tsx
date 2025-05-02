import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaPlus, FaBars, FaArrowRight } from "react-icons/fa";
import Sidebar from "./Sidebar";

interface CostingItem {
  id: number;
  material: string;
  category: string;
  subCategory: string;
  createdOn: string;
  createdBy: string;
  status: string;
}

const initialItems: CostingItem[] = [
  {
    id: 1,
    material: "Flat Buttons",
    category: "Trims & Accessories",
    subCategory: "Button",
    createdOn: "24/03/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 2,
    material: "Shell Buttons",
    category: "Trims & Accessories",
    subCategory: "Button",
    createdOn: "24/03/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 3,
    material: "Lapel button",
    category: "Trims & Accessories",
    subCategory: "Button",
    createdOn: "24/03/2025",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: 4,
    material: "Flag Label",
    category: "Trims & Accessories",
    subCategory: "Labels",
    createdOn: "24/03/2025",
    createdBy: "Admin",
    status: "Active",
  },
];

const CostingMasterListView: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<CostingItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [editedItemName, setEditedItemName] = useState("");
  const [addedTrimName, setAddedTrimName] = useState("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CostingItem | null>(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  const [items, setItems] = useState<CostingItem[]>(initialItems);

  const [newTrim, setNewTrim] = useState({
    name: "",
    material: "",
    category: "",
    subCategory: "",
    createdOn: new Date().toLocaleDateString(),
    createdBy: "Admin",
    status: "Active",
  });

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleExpand = () => setExpanded(!expanded);

  const handleEditClick = (item: CostingItem) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editItem) {
      const updatedItems = items.map((item) =>
        item.id === editItem.id ? editItem : item
      );
      setItems(updatedItems);
      setEditedItemName(editItem.material);
      setShowEditModal(false);
      setShowEditSuccessModal(true);
    }
  };

  const handleAddNewTrim = () => {
    const newItem = {
      id: items.length + 1, // or use UUID
      material: newTrim.name,
      category: newTrim.category,
      subCategory: newTrim.subCategory,
      createdOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
      status: "Active",
    };

    setItems([...items, newItem]); // Update table data
    setNewTrim({
      material: "",
      name: "",
      category: "",
      subCategory: "",
      createdOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
      status: "Active",
    });

    setShowAddModal(false); // Close modal
    setShowAddSuccessModal(true); // Optionally show success modal
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const updatedItems = items.filter((item) => item.id !== itemToDelete.id);
      setItems(updatedItems);

      setShowDeleteConfirmModal(false);
      setShowDeleteSuccessModal(true);
    }
  };

  return (
    <div className="d-flex px-0 py-4">
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

        <h4 className="fw-bold mb-3">Costing Master</h4>

        <Table hover className="no-border-table">
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
            <tr className="grey-row">
              <td>3</td>
              <td>Material</td>
              <td>21/03/2025</td>
              <td>Admin</td>
              <td>Active</td>
              <td>
                <div
                  className="arrow-circle"
                  onClick={toggleExpand}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowRight />
                </div>
              </td>
            </tr>

            {expanded && (
              <tr>
                <td colSpan={6}>
                  <div
                    className="p-3"
                    style={{ background: "#fef8f8", borderRadius: 10 }}
                  >
                    <div className="d-flex justify-content-end mb-2">
                      <Button
                        size="sm"
                        className="custom-add-button"
                        onClick={() => setShowAddModal(true)}
                      >
                        <FaPlus className="me-1" /> Add
                      </Button>
                    </div>

                    <Table striped hover responsive>
                      <thead className="table-light">
                        <tr>
                          <th>S.No</th>
                          <th>Materials</th>
                          <th>Category</th>
                          <th>Sub Category</th>
                          <th>CREATED ON</th>
                          <th>CREATED BY</th>
                          <th>Status</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={item.id}>
                            <td>{idx + 1}</td>
                            <td>{item.material}</td>
                            <td>{item.category}</td>
                            <td>{item.subCategory}</td>
                            <td>{item.createdOn}</td>
                            <td>{item.createdBy}</td>
                            <td>
                              <strong className="text-success">
                                {item.status}
                              </strong>
                            </td>
                            <td>
                              <span
                                onClick={() => handleEditClick(item)}
                                style={{ cursor: "pointer" }}
                              >
                                ✏️
                              </span>
                            </td>
                            <td>
                              <span
                                className="delete-icon"
                                onClick={() => {
                                  setItemToDelete(item);
                                  setShowDeleteConfirmModal(true);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                -
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Add Modal */}
        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          centered
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center">
              Add New Trim Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={newTrim.category}
                  onChange={(e) =>
                    setNewTrim({ ...newTrim, category: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Trims & Accessories">
                    Trims & Accessories
                  </option>
                  <option value="Packaging">Packaging</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sub category</Form.Label>
                <Form.Select
                  value={newTrim.subCategory}
                  onChange={(e) =>
                    setNewTrim({ ...newTrim, subCategory: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Button">Button</option>
                  <option value="Labels">Labels</option>
                  <option value="Lace">Lace</option>
                  <option value="Tapes">Tapes</option>
                  <option value="Primary">Primary</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here"
                  value={newTrim.name}
                  onChange={(e) =>
                    setNewTrim({ ...newTrim, name: e.target.value })
                  }
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  onClick={handleAddNewTrim}
                  disabled={
                    !newTrim.category || !newTrim.subCategory || !newTrim.name
                  }
                >
                  Save
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Added Successfully popup */}
        <Modal
          show={showAddSuccessModal}
          onHide={() => setShowAddSuccessModal(false)}
          centered
          backdrop="static"
          dialogClassName="success-modal"
        >
          <Modal.Body className="text-center p-4">
            <p className="fs-5 mb-4">
              Successfully Added:{" "}
              <span className="text-success fw-bold">{addedTrimName}</span>
            </p>
            <Button
              className="ok-btn"
              onClick={() => setShowAddSuccessModal(false)}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>

        {/* Edit Modal */}
        <Modal
          className="edit-trim-modal"
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center fs-5 fw-semibold">
              Update Trim Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editItem && (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
              >
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={editItem.category}
                      onChange={(e) =>
                        setEditItem({ ...editItem, category: e.target.value })
                      }
                    >
                      <option>Trims & Accessories</option>
                      <option>Labels</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6">
                    <Form.Label>Sub category</Form.Label>
                    <Form.Select
                      value={editItem.subCategory}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          subCategory: e.target.value,
                        })
                      }
                    >
                      <option>Button</option>
                      <option>Tag</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editItem.material}
                      onChange={(e) =>
                        setEditItem({ ...editItem, material: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={editItem.status}
                      onChange={(e) =>
                        setEditItem({ ...editItem, status: e.target.value })
                      }
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="blue-btn px-5">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* Edited Successfully */}
        <Modal
          className="success-modal"
          show={showEditSuccessModal}
          onHide={() => setShowEditSuccessModal(false)}
          centered
          backdrop="static"
        >
          <Modal.Body className="text-center p-4">
            <p className="fs-5 mb-4">
              Sucessfully Updated:{" "}
              <span className="text-success fw-bold">{editedItemName}</span>
            </p>
            <Button
              className="ok-btn px-4"
              onClick={() => setShowEditSuccessModal(false)}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>

        {/* Deletion confirmation model */}
        <Modal
          show={showDeleteConfirmModal}
          onHide={() => setShowDeleteConfirmModal(false)}
          centered
          dialogClassName="custom-delete-modal"
        >
          <Modal.Body className="text-center p-4">
            <p className="fs-5 mb-4">
              Are you sure Delete this :{" "}
              <span className="text-primary fw-semibold">
                {itemToDelete?.material}
              </span>
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="secondary"
                className="px-4"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline-danger"
                className="px-4"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Deletion successfull model */}
        <Modal
          show={showDeleteSuccessModal}
          onHide={() => setShowDeleteSuccessModal(false)}
          centered
          backdrop="static"
          dialogClassName="delete-success-modal"
        >
          <Modal.Body className="text-center p-4">
            <p className="fs-5 mb-4">
              Sucessfully Deleted :{" "}
              <span className="text-success fw-bold">
                {itemToDelete?.material}
              </span>
            </p>
            <Button
              className="ok-btn px-5"
              onClick={() => {
                setShowDeleteSuccessModal(false);
                setItemToDelete(null); // ✅ Clear it only after user sees the message
              }}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CostingMasterListView;
