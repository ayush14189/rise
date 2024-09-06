import React, { useState } from 'react';

const CollaborationRequest = () => {
  // Mock data for startups and researchers
  const mockStartups = [
    { id: 1, name: 'Tech Innovators', field: 'Artificial Intelligence' },
    { id: 2, name: 'Eco Solutions', field: 'Environmental Technology' },
    { id: 3, name: 'Health First', field: 'Healthcare' }
  ];

  const mockResearchers = [
    { id: 1, name: 'Dr. John Smith', expertise: 'Machine Learning' },
    { id: 2, name: 'Prof. Emily Johnson', expertise: 'Sustainable Energy' },
    { id: 3, name: 'Dr. Alex Brown', expertise: 'Medical Diagnostics' }
  ];

  // State to track sent requests
  const [sentRequests, setSentRequests] = useState([]);

  // Function to send collaboration request
  const sendRequest = (collaboratorType, collaborator) => {
    const request = {
      id: `${collaboratorType}-${collaborator.id}`,
      name: collaborator.name,
      type: collaboratorType,
      status: 'Pending'
    };

    setSentRequests([...sentRequests, request]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Collaboration Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* List of Startups */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Startups</h3>
          <ul>
            {mockStartups.map((startup) => (
              <li key={startup.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md">
                <div>
                  <p className="font-semibold">{startup.name}</p>
                  <p className="text-sm text-gray-600">Field: {startup.field}</p>
                </div>
                <button
                  onClick={() => sendRequest('Startup', startup)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Request
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* List of Researchers */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Researchers</h3>
          <ul>
            {mockResearchers.map((researcher) => (
              <li key={researcher.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md">
                <div>
                  <p className="font-semibold">{researcher.name}</p>
                  <p className="text-sm text-gray-600">Expertise: {researcher.expertise}</p>
                </div>
                <button
                  onClick={() => sendRequest('Researcher', researcher)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Request
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Display Sent Requests */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Sent Collaboration Requests</h3>
        {sentRequests.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Collaborator Name</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {sentRequests.map((request) => (
                <tr key={request.id}>
                  <td className="py-2 px-4 border-b">{request.name}</td>
                  <td className="py-2 px-4 border-b">{request.type}</td>
                  <td className="py-2 px-4 border-b">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No collaboration requests sent yet.</p>
        )}
      </div>
    </div>
  );
};

export default CollaborationRequest;
