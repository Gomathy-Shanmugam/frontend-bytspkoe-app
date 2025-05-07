import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaPlus, FaBars, FaArrowRight } from "react-icons/fa";
import { FaTrash, FaEdit } from "react-icons/fa";

import Sidebar from "./Sidebar";
import { v4 as uuidv4 } from "uuid";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axiosService from "../utils/AxiosService";

interface ProductItem {
  id: string;
  name: string;
  group: string;
  status: string;
  createdBy: string;
  createdOn: string;
}

const ProductItemMasterList: React.FC = () => {
  const [items, setItems] = useState<ProductItem[]>([]);
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

  const [productItemSuggestions, setProductItemSuggestions] = useState<
    string[]
  >(["Polo", "Peekey", "Crew Neck"]);

  const productGroupSuggestions = ["Street Wear", "Night Wear", "Formal Wear"];

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleExpand = () => setExpanded(!expanded);

  const fetchItems = async () => {
    try {
      const response = await axiosService.get("/product-items");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch product items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddNew = () => {
    setNewItem({ name: "", group: "", status: "Active" });
    setShowAddModal(true);
  };
  const handleSaveNewProduct = async () => {
    try {
      const newProduct: ProductItem = {
        id: uuidv4(),
        name: newItem.name || "",   // Ensure `newItem` comes from useState
        group: newItem.group || "",
        status: newItem.status || "Active",
        createdOn: new Date().toLocaleDateString(),
        createdBy: "Admin",
      };
  
      await axiosService.post("/product-items", newProduct);
  
      // Update table
      setItems(prev => [...prev, newProduct]);
  
      // Add to suggestions (if needed)
      if (!productItemSuggestions.includes(newProduct.name)) {
        setProductItemSuggestions(prev => [...prev, newProduct.name]);
      }
  
      // Update success state
      setAddedItemName(newProduct.name);
      setShowAddModal(false);
      setShowAddSuccessModal(true);
    } catch (error) {
      console.error("Failed to save product item:", error);
    }
  };
  

  const handleSaveEdit = async () => {
    if (!editItem || !editItem.id) return;
    try {
      await axiosService.put(`/product-items/${editItem.id}`, editItem);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editItem.id
            ? ({ ...item, ...editItem } as ProductItem)
            : item
        )
      );
      setAddedItemName(editItem.name || "");
      setShowEditModal(false);
      setShowAddSuccessModal(true);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItemId) return;
    try {
      await axiosService.delete(`/product-items/${deleteItemId}`);
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteItemId)
      );
      setDeletedItemName(
        items.find((item) => item.id === deleteItemId)?.name || ""
      );
      setDeleteItemId(null);
      setShowDeleteConfirmModal(false);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error("Failed to delete product item:", error);
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
            onClick={toggleSidebar}
            style={{ cursor: "pointer" }}
          />
        </div>

        <h4 className="fw-bold mb-3">Product Item Master</h4>

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
              <td>1</td>
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
                        <FaPlus className="me-1" /> Add
                      </Button>
                    </div>

                    <Table striped hover responsive>
                      <thead className="table-light">
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Product Group</th>
                          <th>Created On</th>
                          <th>Created By</th>
                          <th>Status</th>
                          <th>Edit</th>
                          <th>Delete</th>
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
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setEditItem(item);
                                  setShowEditModal(true);
                                }}
                              >
                                ✏️
                              </span>
                            </td>
                            <td>
                              <span
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() => {
                                  setDeleteItemId(item.id);
                                  setDeletedItemName(item.name);
                                  setShowDeleteConfirmModal(true);
                                }}
                              >
                                🗑️
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
                    setNewItem((prev) => ({ ...prev, group: e.target.value }))
                  }
                >
                  <option value="">Select a product group</option>
                  {productGroupSuggestions.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Item</Form.Label>
                <Typeahead
                  id="product-item-typeahead"
                  labelKey="name"
                  onChange={(selected) => {
                    const selectedItem = selected[0];
                    let name = "";

                    if (typeof selectedItem === "string") {
                      name = selectedItem;
                    } else if (selectedItem?.name) {
                      name = selectedItem.name;
                    } else if (selectedItem?.customOption) {
                      name = selectedItem.label;
                    }

                    setNewItem((prev) => ({ ...prev, name }));
                  }}
                  options={productItemSuggestions.map((name) => ({ name }))}
                  allowNew
                  newSelectionPrefix="Add a new item: "
                  selected={newItem.name ? [{ name: newItem.name }] : []}
                  placeholder="Type or select a product item"
                  renderMenuItemChildren={(option: any) => <>{option.name}</>}
                  minLength={1}
                />
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
          show={showAddSuccessModal}
          onHide={() => setShowAddSuccessModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Product Item <strong>{addedItemName}</strong> has been added
              successfully!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => setShowAddSuccessModal(false)}
            >
              OK
            </Button>
          </Modal.Footer>
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
              <span className="text-success fw-bold">{deletedItemName}</span>
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
