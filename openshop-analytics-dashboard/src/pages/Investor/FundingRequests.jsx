import React from 'react';

const FundingRequests = () => {
  const fundingRequests = [
    { startupName: 'Health First', requestedAmount: '$100,000', date: '2024-06-15', status: 'Pending' },
    { startupName: 'Tech Innovators', requestedAmount: '$200,000', date: '2024-05-10', status: 'Approved' },
    // Add more requests
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Funding Requests</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Startup Name</th>
            <th className="py-2 px-4 border-b">Requested Amount</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {fundingRequests.map((request, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{request.startupName}</td>
              <td className="py-2 px-4 border-b">{request.requestedAmount}</td>
              <td className="py-2 px-4 border-b">{request.date}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundingRequests;
