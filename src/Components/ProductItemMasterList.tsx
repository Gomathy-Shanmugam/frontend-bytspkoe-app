import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaPlus, FaBars, FaArrowRight, FaTrashAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { v4 as uuidv4 } from "uuid";

interface ProductItem {
  id: string;
  name: string;
  group: string;
  status: string;
  createdBy: string;
  createdOn: string;
}

const ProductItemMasterList: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<Partial<ProductItem> | null>(null);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [deletedItemName, setDeletedItemName] = useState("");

  const [newItem, setNewItem] = useState<Partial<ProductItem>>({
    name: "",
    group: "",
    status: "Active",
  });

  const [items, setItems] = useState<ProductItem[]>([
    {
      id: "1",
      name: "Polo",
      group: "Street Wear",
      status: "Active",
      createdBy: "Admin",
      createdOn: "24/03/2025",
    },
    {
      id: "2",
      name: "Peekey",
      group: "Night Wear",
      status: "Active",
      createdBy: "Admin",
      createdOn: "24/03/2025",
    },
  ]);

  const toggleExpand = () => setExpanded(!expanded);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleAddNew = () => {
    setNewItem({ name: "", group: "", status: "Active" });
    setShowAddModal(true);
  };

  const handleSaveNewProduct = () => {
    const newProduct: ProductItem = {
      id: uuidv4(),
      name: newItem.name || "",
      group: newItem.group || "",
      status: newItem.status || "Active",
      createdOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    };

    setItems([...items, newProduct]);
    setAddedItemName(newProduct.name);
    setNewItem({ name: "", group: "", status: "Active" });
    setShowAddModal(false);
    setShowAddSuccessModal(true);
  };

  const handleSaveEdit = () => {
    if (!editItem || !editItem.id) return;

    const updatedItems = items.map((item) =>
      item.id === editItem.id
        ? ({
            ...editItem,
            createdBy: item.createdBy,
            createdOn: item.createdOn,
          } as ProductItem)
        : item
    );

    setItems(updatedItems);
    setShowEditModal(false);
    setAddedItemName(editItem.name || "");
    setShowAddSuccessModal(true);
  };
  const confirmDelete = () => {
    if (deleteItemId !== null) {
      // Remove the item from the items array
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteItemId)
      );

      // Hide confirmation modal and show success modal
      setShowDeleteConfirmModal(false);
      setShowDeleteSuccessModal(true);

      // Optionally, reset deleted item ID
      setDeleteItemId(null);
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

        <h4 className="fw-bold mb-3">Product Item Master - list view</h4>

        <Table hover className="no-border-table">
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
            <tr className="grey-row">
              <td>3</td>
              <td>Product Item</td>
              <td>21/03/2025</td>
              <td>Admin</td>
              <td>Active</td>
              <td>
                <div
                  onClick={toggleExpand}
                  className="arrow-circle"
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowRight className="arrow-icon" />
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
                        onClick={handleAddNew}
                      >
                        <FaPlus className="me-1" /> Add New
                      </Button>
                    </div>

                    <Table striped hover responsive>
                      <thead className="table-light">
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Product Group</th>
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
                            <td>{item.name}</td>
                            <td>{item.group}</td>
                            <td>{item.createdOn}</td>
                            <td>{item.createdBy}</td>
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
                            <td>
                              <span
                                onClick={() => {
                                  setEditItem(item);
                                  setShowEditModal(true);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                ✏️
                              </span>
                            </td>
                            <td>
                              <span
                                className="delete-icon"
                                onClick={() => {
                                  setDeleteItemId(item.id);
                                  setDeletedItemName(item.name);
                                  setShowDeleteConfirmModal(true);
                                }}
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
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Product Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Group</Form.Label>
                <Form.Select
                  value={newItem.group}
                  onChange={(e) =>
                    setNewItem({ ...newItem, group: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Street Wear">Street Wear</option>
                  <option value="Night Wear">Night Wear</option>
                  <option value="Formal Wear">Formal Wear</option>
                  <option value="Ethnic Wear">Ethnic Wear</option>
                  <option value="Sports Wear">Sports Wear</option>
                  <option value="Lounge Wear">Lounge Wear</option>
                  <option value="Party Wear">Party Wear</option>
                  <option value="Winter Wear">Winter Wear</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Item</Form.Label>
                <Form.Select
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                >
                  <option value="">Select Product Item</option>
                  <option value="Polo">Polo</option>
                  <option value="Peekey">Peekey</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Joggers">Joggers</option>
                  <option value="Mock Neck">Mock Neck</option>
                  <option value="Sweater Vest">Sweater Vest</option>
                  <option value="Raglan">Raglan</option>
                  <option value="Crew Neck">Crew Neck</option>
                  <option value="Cossack">Cossack</option>
                  <option value="Sailor">Sailor</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="V-Neck">V-Neck</option>
                  <option value="Dinner Suit">Dinner Suit</option>
                  <option value="Sleep suit">Sleep suit</option>
                  <option value="Pyjama">Pyjama</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Blazers">Blazers</option>
                  <option value="Sweat Shirts">Sweat Shirts</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              disabled={!newItem.name || !newItem.group}
              onClick={handleSaveNewProduct}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal
          className="edit-modal"
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editItem && (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editItem.name}
                    onChange={(e) =>
                      setEditItem({ ...editItem, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Product Group</Form.Label>
                  <Form.Control
                    type="text"
                    value={editItem.group}
                    onChange={(e) =>
                      setEditItem({ ...editItem, group: e.target.value })
                    }
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    disabled={!editItem.name || !editItem.group}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* ✅ Success Popup */}
        <Modal
          className="edit-success-modal"
          show={showAddSuccessModal}
          onHide={() => setShowAddSuccessModal(false)}
          centered
          backdrop="static"
        >
          <Modal.Body>
            <p>
              Successfully Updated: <span>{addedItemName}</span>
            </p>
            <Button
              onClick={() => setShowAddSuccessModal(false)}
              className="ok-btn"
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteConfirmModal}
          onHide={() => setShowDeleteConfirmModal(false)}
          centered
          contentClassName="border-0"
          dialogClassName="delete-confirm-modal"
        >
          <Modal.Body className="text-center p-4 rounded-4 shadow">
            <p className="fw-semibold mb-4">
              Are you sure Delete this :{" "}
              <span className="text-primary fw-bold">{deletedItemName}</span>
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="secondary"
                className="px-4 rounded-3"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline-danger"
                className="px-4 rounded-3 fw-semibold"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Delete Success Modal */}
        <Modal
          show={showDeleteSuccessModal}
          onHide={() => setShowDeleteSuccessModal(false)}
          centered
          contentClassName="border-0"
          dialogClassName="delete-success-modal"
        >
          <Modal.Body className="text-center p-4 rounded-4 shadow">
            <p className="fw-semibold mb-4">
              Successfully Deleted :{" "}
              <span className="text-primary fw-bold">{deletedItemName}</span>
            </p>
            <Button
              onClick={() => setShowDeleteSuccessModal(false)}
              className="ok-btn"
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ProductItemMasterList;
