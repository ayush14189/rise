import React from 'react';

const CollaborationRequests = () => {
  const collaborationRequests = [
    { startupName: 'Eco Solutions', purpose: 'Research Collaboration', status: 'Pending' },
    { startupName: 'Tech Innovators', purpose: 'AI Development Collaboration', status: 'Approved' },
    // Add more requests
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Collaboration Requests</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Startup Name</th>
            <th className="py-2 px-4 border-b">Purpose</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {collaborationRequests.map((request, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{request.startupName}</td>
              <td className="py-2 px-4 border-b">{request.purpose}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollaborationRequests;
