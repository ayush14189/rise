import React, { useState, useEffect } from 'react';

const FundingRequests = () => {
  const [fundingRequests, setFundingRequests] = useState([]);
  
  const [showCounterForm, setShowCounterForm] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const investor = JSON.parse(localStorage.getItem('userInfo'))
  console.log(investor._id)
  const [counterData, setCounterData] = useState({
    counterAmount: '',
    counterEquity: '',
    investor_id: investor._id,
  });

  useEffect(() => {
    fetchFundingRequests();
  }, []);

  const fetchFundingRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/funding-requests/');
      const data = await response.json();
      setFundingRequests(data);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
    }
  };

  const handleAcceptRequest = async (request) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/funding-requests/${request._id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted', investor_id: investor._id }),
      });

      if (response.ok) {
        const updatedRequest = await response.json();
        setFundingRequests((prevRequests) =>
          prevRequests.map((req) => (req._id === request._id ? updatedRequest : req))
        );

        // Post data to Investment schema
        // await fetch('http://localhost:5000/api/user/investments', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     investor_id: request.investor_id,
        //     startupName: request.startup_id,
        //     amount: request.requestedAmount,
        //     investmentDate: new Date(),
        //     equityPercentage: request.proposedEquity,
        //   }),
        // });
      } else {
        console.error('Failed to accept request');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleCounterRequest = (request) => {
    setCurrentRequestId(request._id);
    setShowCounterForm(true);
  };

  const handleCounterChange = (e) => {
    const { name, value } = e.target;
    setCounterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCounterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/funding-requests/${currentRequestId}/counter`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(counterData),
      });

      if (response.ok) {
        const updatedRequest = await response.json();
        setFundingRequests((prevRequests) =>
          prevRequests.map((req) => (req._id === currentRequestId ? updatedRequest : req))
        );
        setShowCounterForm(false);
        setCounterData({
          counterAmount: '',
          counterEquity: '',
          investor_id: '',
        });
      } else {
        console.error('Failed to submit counter request');
      }
    } catch (error) {
      console.error('Error submitting counter request:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Funding Requests</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Startup Name</th>
            <th className="py-2 px-4 border-b">Requested Amount</th>
            <th className="py-2 px-4 border-b">Proposed Equity</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(fundingRequests)}
          {fundingRequests.map((request, index) => (
            <tr key={index}>
              {console.log(request.startup_id.
startup_name
)}
              <td className="py-2 px-4 border-b">{request.startup_id.startup_name}</td>
              <td className="py-2 px-4 border-b">{request.requestedAmount}</td>
              <td className="py-2 px-4 border-b">{request.proposedEquity}</td>
              <td className="py-2 px-4 border-b">{request.createdAt}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleAcceptRequest(request)}
                  className="px-4 py-2 text-white bg-green-500 rounded-md mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleCounterRequest(request)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded-md"
                >
                  Counter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCounterForm && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Counter Offer</h3>
          <form onSubmit={handleCounterSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Counter Amount</label>
              <input
                type="number"
                name="counterAmount"
                value={counterData.counterAmount}
                onChange={handleCounterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Counter Equity (%)</label>
              <input
                type="number"
                name="counterEquity"
                value={counterData.counterEquity}
                onChange={handleCounterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Investor ID</label>
              <input
                type="text"
                name="investor_id"
                value={counterData.investor_id}
                onChange={handleCounterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div> */}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Submit Counter Offer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FundingRequests;