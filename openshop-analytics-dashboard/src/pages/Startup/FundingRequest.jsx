import React, { useState } from 'react';

const FundingRequest = () => {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    description: ''
  });

  const [submittedRequests, setSubmittedRequests] = useState([]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new request to the table
    setSubmittedRequests([...submittedRequests, { ...formData, status: 'Pending' }]);

    // Clear the form
    setFormData({
      amount: '',
      purpose: '',
      description: ''
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Funding Request Form */}
      <h2 className="text-2xl font-bold mb-4">Submit a Funding Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="amount">Funding Amount (in $)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="purpose">Purpose</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter purpose"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>

      {/* Table to display submitted requests */}
      <h2 className="text-2xl font-bold mb-4">Submitted Requests</h2>
      {submittedRequests.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Purpose</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {submittedRequests.map((request, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{request.amount}</td>
                <td className="py-2 px-4 border-b">{request.purpose}</td>
                <td className="py-2 px-4 border-b">{request.description}</td>
                <td className="py-2 px-4 border-b">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No funding requests submitted yet.</p>
      )}
    </div>
  );
};

export default FundingRequest;
