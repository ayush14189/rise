import React, { useState, useEffect } from 'react';
import axios from 'axios';


const NewTrademarkApplications = () => {
  const [applications, setApplications] = useState([]);


  useEffect(() => {
    // Fetch trademark applications from the backend
    axios.get('http://localhost:5000/api/user/trademarks')
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the trademark applications!', error);
      });
  }, []);


  const handleApprove = (applicationId) => {
    // Send a request to the backend to update the status of the application
    axios.post(`http://localhost:5000/api/user/ipr/trademarks/${applicationId}/approve`)
      .then(response => {
        // Update the local state to reflect the change
        setApplications(applications.map(app =>
          app._id === applicationId ? { ...app, status: 'Registered' } : app
        ));
      })
      .catch(error => {
        console.error('There was an error approving the trademark application!', error);
      });
  };


  const handleReject = (applicationId) => {
    // Send a request to the backend to update the status of the application
    axios.post(`http://localhost:5000/api/user/ipr/trademarks/${applicationId}/reject`)
      .then(response => {
        // Update the local state to reflect the change
        setApplications(applications.map(app =>
          app._id === applicationId ? { ...app, status: 'Rejected' } : app
        ));
      })
      .catch(error => {
        console.error('There was an error rejecting the trademark application!', error);
      });
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Trademark Applications</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Trademark Number</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Owner</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{application.trademarkNumber}</td>
                <td className="py-2 px-4 border-b">{application.title}</td>
                <td className="py-2 px-4 border-b">{application.owner}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    application.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    application.status === 'Registered' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {application.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {application.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(application._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(application._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default NewTrademarkApplications;
