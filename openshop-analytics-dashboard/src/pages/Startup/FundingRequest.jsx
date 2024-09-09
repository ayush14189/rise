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
        
      }, body : JSON.stringify({ status: 'accepted' })});

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
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Submit New Funding Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Requested Amount</label>
          <input
            type="number"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Proposed Equity (%)</label>
          <input
            type="number"
            name="proposedEquity"
            value={formData.proposedEquity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Purpose</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Funding Requests</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">S. No.</th>
            <th className="py-2">Investor Name</th>
            <th className="py-2">Requested Amount</th>
            <th className="py-2">Proposed Equity</th>
            <th className="py-2">Purpose</th>
            <th className="py-2">Status</th>
            <th className="py-2">Counter Amount</th>
            <th className="py-2">Counter Equity</th>
            <th className="py-2">Negotiation Message</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(fundingRequests)}
          {fundingRequests && fundingRequests.map((request,index) => (
            <tr key={request._id}>
              <td className="py-2">{index+1}</td>
              <td className="py-2">{request.investor_id?.name || '-'}</td>
              <td className="py-2">{request.requestedAmount}</td>
              <td className="py-2">{request.proposedEquity}</td>
              <td className="py-2">{request.purpose || '-'}</td>
              <td className="py-2">{request.status}</td>
              <td className="py-2">{request.counterAmount || '-'}</td>
              <td className="py-2">{request.counterEquity || '-'}</td>
              <td className="py-2">{request.negotiationMessage || '-'}</td>
              <td className="py-2">
                {request.status === 'countered' && (
                  <button
                    onClick={() => handleAcceptProposal(request._id)}
                    className="px-4 py-2 text-white bg-green-500 rounded-md"
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