import React, { useState } from 'react';
import './RolesPage.css';
import PermissionsModal from './PermissionModal';
import SuccessPopup from './SuccessPopup';
import './Crud.css'

interface Role {
  id: number;
  role: string;
  create: boolean;
  view: boolean;
  update: boolean;
  delete: boolean;
}

const RolesPage: React.FC = () => {
  const [rolesData, setRolesData] = useState<Role[]>([
    { id: 1, role: 'Sr.Merchandiser', create: false, view: false, update: false, delete: false },
    { id: 2, role: 'PD Merchandiser', create: false, view: false, update: false, delete: false },
    { id: 3, role: 'Assistant Merchandiser', create: false, view: false, update: false, delete: false },
    { id: 4, role: 'Admin', create: false, view: false, update: false, delete: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [updatedRoleName, setUpdatedRoleName] = useState('');

  const handleEditClick = (roleId: number) => {
    const role = rolesData.find((r) => r.id === roleId);
    if (role) {
      setSelectedRoleId(roleId);
      const permissions = [];
      if (role.create) permissions.push('Create');
      if (role.view) permissions.push('View');
      if (role.update) permissions.push('Update');
      if (role.delete) permissions.push('Delete');
      setSelectedPermissions(permissions);
      setIsModalOpen(true);
    }
  };

  const handleSavePermissions = (updatedPermissions: string[]) => {
    if (selectedRoleId !== null) {
      const updatedRoles = rolesData.map((role) => {
        if (role.id === selectedRoleId) {
          setUpdatedRoleName(role.role);
          return {
            ...role,
            create: updatedPermissions.includes('Create'),
            view: updatedPermissions.includes('View'),
            update: updatedPermissions.includes('Update'),
            delete: updatedPermissions.includes('Delete'),
          };
        }
        return role;
      });
      setRolesData(updatedRoles);
      setShowPopup(true);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="roles-container">
      <div className="roles-header">
        <span></span> Roles & Responsibilities
      </div>

      <table className="roles-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Roles</th>
            <th>Create</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Rights Access</th>
          </tr>
        </thead>
        <tbody>
          {rolesData.map((role, index) => (
            <tr key={role.id}>
              <td>{index + 1}</td>
              <td style={{ fontWeight: 600 }}>{role.role}</td>
              <td className="checkbox-cell">
                <input type="checkbox" checked={role.create} readOnly />
              </td>
              <td className="checkbox-cell">
                <input type="checkbox" checked={role.view} readOnly />
              </td>
              <td className="checkbox-cell">
                <input type="checkbox" checked={role.update} readOnly />
              </td>
              <td className="checkbox-cell">
                <input type="checkbox" checked={role.delete} readOnly />
              </td>
              <td className="edit-cell">
                <button className="edit-button" onClick={() => handleEditClick(role.id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <PermissionsModal
          initialPermissions={selectedPermissions}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePermissions}
        />
      )}

      {showPopup && (
        <SuccessPopup
          role={updatedRoleName}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default RolesPage;