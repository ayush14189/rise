import React, { useState, useEffect } from 'react';

const PatentForm = () => {
  const [formData, setFormData] = useState({
    patentNumber: '',
    title: '',
    description: '',
    filingDate: '',
    inventor: '',
    status: 'Pending',
  });

  const [patents, setPatents] = useState([]);

  useEffect(() => {
    fetchPatents();
  }, []);

  const fetchPatents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/patents');
      const data = await response.json();
      setPatents(data);
    } catch (error) {
      console.error('Error fetching patents:', error);
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
      const response = await fetch('http://localhost:5000/api/user/patents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPatent = await response.json();
        setPatents((prevPatents) => [...prevPatents, newPatent]);
        setFormData({
          patentNumber: '',
          title: '',
          description: '',
          filingDate: '',
          inventor: '',
          status: 'Pending',
        });
      } else {
        console.error('Failed to submit patent');
      }
    } catch (error) {
      console.error('Error submitting patent:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">Submit New Patent</h2>
      <form onSubmit={handleSubmit}>
        {/* Patent Number */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Patent Number</label>
          <input
            type="text"
            name="patentNumber"
            value={formData.patentNumber}
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

        {/* Inventor */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Inventor</label>
          <input
            type="text"
            name="inventor"
            value={formData.inventor}
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
            <option value="Granted">Granted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>

      <h2 className="text-3xl font-bold mt-12 mb-8 text-center text-gray-700 tracking-wide">Submitted Patents</h2>
      <table className="min-w-full bg-white rounded-lg shadow-lg mt-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600">Patent Number</th>
            <th className="py-3 px-4 text-left text-gray-600">Title</th>
            <th className="py-3 px-4 text-left text-gray-600">Description</th>
            <th className="py-3 px-4 text-left text-gray-600">Filing Date</th>
            <th className="py-3 px-4 text-left text-gray-600">Inventor</th>
            <th className="py-3 px-4 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {patents && patents.map((patent) => (
            <tr key={patent._id}>
              <td className="py-3 px-4 border-t border-gray-200">{patent.patentNumber}</td>
              <td className="py-3 px-4 border-t border-gray-200">{patent.title}</td>
              <td className="py-3 px-4 border-t border-gray-200">{patent.description}</td>
              <td className="py-3 px-4 border-t border-gray-200">{new Date(patent.filingDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-t border-gray-200">{patent.inventor}</td>
              <td className="py-3 px-4 border-t border-gray-200">{patent.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatentForm;