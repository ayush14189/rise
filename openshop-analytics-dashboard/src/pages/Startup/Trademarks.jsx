import React, { useState, useEffect } from 'react';

const TrademarkForm = () => {
  const [formData, setFormData] = useState({
    trademarkNumber: '',
    title: '',
    description: '',
    filingDate: '',
    registrationDate: '',
    owner: '',
    status: 'Pending',
  });

  const [trademarks, setTrademarks] = useState([]);

  useEffect(() => {
    fetchTrademarks();
  }, []);

  const fetchTrademarks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/trademarks');
      const data = await response.json();
      setTrademarks(data);
    } catch (error) {
      console.error('Error fetching trademarks:', error);
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
      const response = await fetch('http://localhost:5000/api/user/trademarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newTrademark = await response.json();
        setTrademarks((prevTrademarks) => [...prevTrademarks, newTrademark]);
        setFormData({
          trademarkNumber: '',
          title: '',
          description: '',
          filingDate: '',
          registrationDate: '',
          owner: '',
          status: 'Pending',
        });
      } else {
        console.error('Failed to submit trademark');
      }
    } catch (error) {
      console.error('Error submitting trademark:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Submit New Trademark</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Trademark Number</label>
          <input
            type="text"
            name="trademarkNumber"
            value={formData.trademarkNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filing Date</label>
          <input
            type="date"
            name="filingDate"
            value={formData.filingDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Registration Date</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Registered">Registered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Submitted Trademarks</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Trademark Number</th>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Filing Date</th>
            <th className="py-2">Registration Date</th>
            <th className="py-2">Owner</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {trademarks && trademarks.map((trademark) => (
            <tr key={trademark._id}>
              <td className="py-2">{trademark.trademarkNumber}</td>
              <td className="py-2">{trademark.title}</td>
              <td className="py-2">{trademark.description}</td>
              <td className="py-2">{new Date(trademark.filingDate).toLocaleDateString()}</td>
              <td className="py-2">{new Date(trademark.registrationDate).toLocaleDateString()}</td>
              <td className="py-2">{trademark.owner}</td>
              <td className="py-2">{trademark.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrademarkForm;