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
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">Submit New Trademark</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trademark Number */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Trademark Number</label>
          <input
            type="text"
            name="trademarkNumber"
            value={formData.trademarkNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            rows="4"
          />
        </div>

        {/* Filing Date */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Filing Date</label>
          <input
            type="date"
            name="filingDate"
            value={formData.filingDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>

        {/* Registration Date */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Registration Date</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>

        {/* Owner */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>

        {/* Status */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          >
            <option value="Pending">Pending</option>
            <option value="Registered">Registered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>

      <h2 className="text-3xl font-bold mt-12 mb-8 text-center text-gray-700 tracking-wide">Submitted Trademarks</h2>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr>
            <th className="py-3 px-4">Trademark Number</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Filing Date</th>
            <th className="py-3 px-4">Registration Date</th>
            <th className="py-3 px-4">Owner</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {trademarks && trademarks.map((trademark) => (
            <tr key={trademark._id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{trademark.trademarkNumber}</td>
              <td className="py-3 px-4">{trademark.title}</td>
              <td className="py-3 px-4">{trademark.description}</td>
              <td className="py-3 px-4">{new Date(trademark.filingDate).toLocaleDateString()}</td>
              <td className="py-3 px-4">{new Date(trademark.registrationDate).toLocaleDateString()}</td>
              <td className="py-3 px-4">{trademark.owner}</td>
              <td className="py-3 px-4">{trademark.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrademarkForm;