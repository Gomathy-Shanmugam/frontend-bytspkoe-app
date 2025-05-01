import React, { useState } from 'react';
import './Crud.css'

interface PermissionsModalProps {
  initialPermissions: string[];
  onClose: () => void;
  onSave: (updatedPermissions: string[]) => void;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({
  initialPermissions,
  onClose,
  onSave,
}) => {
  const [permissions, setPermissions] = useState<string[]>(initialPermissions);

  const handleCheckboxChange = (permission: string) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((perm) => perm !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSaveClick = () => {
    onSave(permissions);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Permissions</h2>
        <div className="permissions-list">
          <label>
            <input
              type="checkbox"
              checked={permissions.includes('Create')}
              onChange={() => handleCheckboxChange('Create')}
            />
            {' '}Create
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.includes('View')}
              onChange={() => handleCheckboxChange('View')}
            />
            {' '}View
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.includes('Update')}
              onChange={() => handleCheckboxChange('Update')}
            />
            {' '}Update
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.includes('Delete')}
              onChange={() => handleCheckboxChange('Delete')}
            />
            {' '}Delete
          </label>
        </div>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="update-button" onClick={handleSaveClick}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsModal;