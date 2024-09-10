import React, { useState, useEffect } from 'react';

const FundingRequests = () => {
  const startupJson = localStorage.getItem('userInfo');
  const startup = JSON.parse(startupJson);
  const [formData, setFormData] = useState({
    requestedAmount: '',
    proposedEquity: '',
    purpose: '',
    startup_id: startup._id,
  });
  
  const [fundingRequests, setFundingRequests] = useState([]);

  useEffect(() => {
    fetchFundingRequests();
  }, []);

  const fetchFundingRequests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/funding-requests/${startup._id}`);
      const data = await response.json();
      setFundingRequests(data);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/funding-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newFundingRequest = await response.json();
        setFundingRequests((prevRequests) => [...prevRequests, newFundingRequest]);
        setFormData({
          requestedAmount: '',
          proposedEquity: '',
          purpose: '',
        });
      } else {
        console.error('Failed to submit funding request');
      }
    } catch (error) {
      console.error('Error submitting funding request:', error);
    }
  };

  const handleAcceptProposal = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/funding-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (response.ok) {
        const updatedRequest = await response.json();
        setFundingRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? updatedRequest : request
          )
        );
      } else {
        console.error('Failed to accept proposal');
      }
    } catch (error) {
      console.error('Error accepting proposal:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">
        Submit New Funding Request
      </h2>
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Requested Amount</label>
          <input
            type="number"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Proposed Equity (%)</label>
          <input
            type="number"
            name="proposedEquity"
            value={formData.proposedEquity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Purpose</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>

      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">
        Funding Requests Sent
      </h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
          <tr>
            <th className="py-4 px-6 font-medium text-gray-700">S. No.</th>
            <th className="py-4 px-6 font-medium text-gray-700">Investor Name</th>
            <th className="py-4 px-6 font-medium text-gray-700">Requested Amount</th>
            <th className="py-4 px-6 font-medium text-gray-700">Proposed Equity</th>
            <th className="py-4 px-6 font-medium text-gray-700">Purpose</th>
            <th className="py-4 px-6 font-medium text-gray-700">Status</th>
            <th className="py-4 px-6 font-medium text-gray-700">Counter Amount</th>
            <th className="py-4 px-6 font-medium text-gray-700">Counter Equity</th>
            <th className="py-4 px-6 font-medium text-gray-700">Negotiation Message</th>
            <th className="py-4 px-6 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fundingRequests.length>0 && fundingRequests?.map((request, index) => (
            <tr key={request._id} className="border-t border-gray-200 hover:bg-gray-50 transition ease-in-out duration-200">
              <td className="py-4 px-6 text-gray-700">{index + 1}</td>
              <td className="py-4 px-6 text-gray-700">{request.investor_id?.name || '-'}</td>
              <td className="py-4 px-6 text-gray-700">{request.requestedAmount}</td>
              <td className="py-4 px-6 text-gray-700">{request.proposedEquity}</td>
              <td className="py-4 px-6 text-gray-700">{request.purpose || '-'}</td>
              <td className="py-4 px-6 text-gray-700">{request.status}</td>
              <td className="py-4 px-6 text-gray-700">{request.counterAmount || '-'}</td>
              <td className="py-4 px-6 text-gray-700">{request.counterEquity || '-'}</td>
              <td className="py-4 px-6 text-gray-700">{request.negotiationMessage || '-'}</td>
              <td className="py-4 px-6">
                {request.status === 'countered' && (
                  <button
                    onClick={() => handleAcceptProposal(request._id)}
                    className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Accept Proposal
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundingRequests;