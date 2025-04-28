import React from 'react';
import { useNavigate } from 'react-router-dom';



interface EnquiryItem {
  id: number;
  name: string;
  createdOn: string;
  createdBy: string;
  status: string;
}

const enquiryData: EnquiryItem[] = [
  { id: 1, name: 'Season', createdOn: '24/03/2025', createdBy: 'Admin', status: 'Active' },
  { id: 2, name: 'Product Group', createdOn: '21/03/2025', createdBy: 'Admin', status: 'Active' },
  { id: 3, name: 'Product Item', createdOn: '19/03/2025', createdBy: 'Admin', status: 'Active' },
  { id: 4, name: 'Age Group', createdOn: '12/03/2025', createdBy: 'Admin', status: 'Active' },
  { id: 5, name: 'Gender', createdOn: '06/03/2025', createdBy: 'Admin', status: 'Active' },
  { id: 6, name: 'Port of Origin', createdOn: '02/03/2025', createdBy: 'Admin', status: 'Active' },
  { id: 7, name: 'Port of Discharge', createdOn: '27/02/2025', createdBy: 'Admin', status: 'Active' },
  { id: 8, name: 'Incoterm', createdOn: '25/02/2025', createdBy: 'Admin', status: 'Active' },
  { id: 9, name: 'Preferred Currency', createdOn: '20/02/2025', createdBy: 'Admin', status: 'Active' },
  { id: 10, name: 'Order Quantity', createdOn: '14/02/2025', createdBy: 'Admin', status: 'Active' },
];

const EnquiryMasterList: React.FC = () => {
  const navigate = useNavigate();

  const handleViewClick = (id: number) => {
    navigate(`/enquiry/${id}`);
  };

  return (
    <div className="page-container">
      <div className="mb-4">
        <h2>Enquiry Master - List View</h2>
      </div>
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Created On</th>
                <th scope="col">Created By</th>
                <th scope="col">Status</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {enquiryData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="fw-semibold">{item.name}</td>
                  <td>{item.createdOn}</td>
                  <td className="fw-semibold">{item.createdBy}</td>
                  <td className="text-success fw-bold">{item.status}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(item.id)}
                      className="view-button"
                    >
                      ➡️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiryMasterList;

