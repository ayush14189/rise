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
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Submit New Patent</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Patent Number</label>
          <input
            type="text"
            name="patentNumber"
            value={formData.patentNumber}
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
          <label className="block text-sm font-medium mb-1">Inventor</label>
          <input
            type="text"
            name="inventor"
            value={formData.inventor}
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
            <option value="Granted">Granted</option>
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

      <h2 className="text-xl font-semibold mt-8 mb-4">Submitted Patents</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Patent Number</th>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Filing Date</th>
            <th className="py-2">Inventor</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patents && patents?.map((patent) => (
            <tr key={patent._id}>
              <td className="py-2">{patent.patentNumber}</td>
              <td className="py-2">{patent.title}</td>
              <td className="py-2">{patent.description}</td>
              <td className="py-2">{new Date(patent.filingDate).toLocaleDateString()}</td>
              <td className="py-2">{patent.inventor}</td>
              <td className="py-2">{patent.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatentForm;