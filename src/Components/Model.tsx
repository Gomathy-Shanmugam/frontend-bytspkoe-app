import React from 'react';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Season Master - Details</h5>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Created On</th>
                <th>Created By</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Spring-Summer-2025</td>
                <td>24/03/2025</td>
                <td>Admin</td>
                <td className="text-success fw-bold">Active</td>
                <td>
                  <button className="btn btn-link">
                    ✏️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
