import React, { useState } from 'react';
import { FaBars, FaBell, FaCommentDots, FaUserCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Modal from './Model';

const Master: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // for Modal open/close

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const pipelines = [
    { id: 1, name: 'Season', createdOn: '24/03/2025', createdBy: 'Admin', status: 'Active' },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const detailedData = [
    { id: 1, name: 'Spring Summer -2025', createdOn: '24/03/2025', createdBy: 'Admin', status: 'Active' },
    { id: 2, name: 'Autumn Winter -2025', createdOn: '24/03/2025', createdBy: 'Admin', status: 'Active' },
    { id: 3, name: 'Pre-Summer -2025', createdOn: '24/03/2025', createdBy: 'Admin', status: 'Active' },
    { id: 4, name: 'Pre-Spring -2025', createdOn: '24/03/2025', createdBy: 'Admin', status: 'Active' },
  ];

  return (
    <div className="master-wrapper">
      {sidebarVisible && <Sidebar />}

      <div className="main-area">
        <div className="topbar">
          <FaBars className="menu-icon" onClick={toggleSidebar} />
          <div className="top-icons">
            <FaBell className="top-icon" />
            <FaCommentDots className="top-icon" />
            <FaUserCircle className="top-icon" />
          </div>
        </div>

        <h2 className="master-title">✨ List View</h2>

        <table className="master-table">
          <thead>
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
            {pipelines.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td><strong>{p.name}</strong></td>
                <td>{p.createdOn}</td>
                <td>{p.createdBy}</td>
                <td>{p.status}</td>
                <td>
                  <span 
                    style={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={openModal}
                  >
                    👁️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal part */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Season Details</h2>
        <table className="modal-table">
          <thead>
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
            {detailedData.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.createdOn}</td>
                <td>{item.createdBy}</td>
                <td>{item.status}</td>
                <td>✏️</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default Master;
