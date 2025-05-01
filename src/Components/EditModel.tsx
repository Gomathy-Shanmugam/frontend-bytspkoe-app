import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you have axios set up for API requests

interface EditModalProps {
  permissions: string[];
  onClose: () => void;
  onSave: (permissions: string[]) => void;
}

const allPermissions = ["Create", "View", "Update", "Delete"];

// Assuming you have an Axios service function to send data
const axiosService = {
  updatePermissions: (componentName: string, permissions: string[]) => {
    return axios.post('/api/updatePermissions', {
      componentName,
      permissions,
    });
  }
};

const EditModal: React.FC<EditModalProps> = ({
  permissions,
  onClose,
  onSave,
}) => {
  const [selected, setSelected] = useState<string[]>(permissions);

  const handleCheckboxChange = (perm: string) => {
    setSelected((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const isChanged =
    JSON.stringify(permissions.sort()) !== JSON.stringify(selected.sort());

  const handleSave = () => {
    // Sending the component name and the selected permissions to the API
    const componentName = "EditModal"; // Sending the name of the modal/component

    // Call the onSave function (you can keep this or handle logic here)
    onSave(selected);

    // Send data to API using axios service
    axiosService.updatePermissions(componentName, selected)
      .then(response => {
        console.log("Permissions updated successfully:", response.data);
        // Optionally close modal or handle any success logic
        onClose();
      })
      .catch(error => {
        console.error("Error updating permissions:", error);
        // Optionally show error message or handle error state
      });
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Edit Responsibilities</h3>
        <div className="checkbox-group">
          {allPermissions.map((perm) => (
            <label key={perm}>
              <input
                type="checkbox"
                checked={selected.includes(perm)}
                onChange={() => handleCheckboxChange(perm)}
              />
              {perm}
            </label>
          ))}
        </div>
        <div className="button-container">
          <button
            className={`update-button ${isChanged ? "active" : ""}`}
            onClick={handleSave}
            disabled={!isChanged}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
