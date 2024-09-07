import React, { useState, useEffect } from 'react';

const PatentFiling = () => {
  const [formData, setFormData] = useState({
    patentNumber: '',
    title: '',
    description: '',
    filingDate: '',
    inventor: '',
    status: 'Pending'
  });

  const [submittedPatents, setSubmittedPatents] = useState([]);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit patent data to the backend (assumed endpoint)
      const response = await fetch(`${process.env.BASE_URL}/api/patents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Patent submitted successfully:', result);

        // Update the table with the newly submitted patent
        setSubmittedPatents([...submittedPatents, result]);

        // Reset the form fields
        setFormData({
          patentNumber: '',
          title: '',
          description: '',
          filingDate: '',
          inventor: '',
          status: 'Pending',
        });
      } else {
        console.error('Failed to submit patent.');
      }
    } catch (error) {
      console.error('Error while submitting patent:', error);
    }
  };

  // Fetch all patents (assumed API endpoint)
  useEffect(() => {
    const fetchPatents = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/patents`);
        if (response.ok) {
          const result = await response.json();
          setSubmittedPatents(result);
        }
      } catch (error) {
        console.error('Error fetching patents:', error);
      }
    };

    fetchPatents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Patent Filing Form</h2>

      {/* Form for patent details */}
      <form onSubmit={handleSubmit} className="mb-6">
        {/* Patent Number */}
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

        {/* Title */}
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

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Filing Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filing Date</label>
          <input
            type="date"
            name="filingDate"
            value={formData.filingDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Inventor */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Inventor</label>
          <input
            type="text"
            name="inventor"
            value={formData.inventor}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit Patent
        </button>
      </form>

      {/* Display the submitted patents in a table */}
      <h2 className="text-xl font-semibold mb-4">Submitted Patents</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Patent Number</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Filing Date</th>
            <th className="px-4 py-2">Inventor</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {submittedPatents.map((patent, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{patent.patentNumber}</td>
              <td className="border px-4 py-2">{patent.title}</td>
              <td className="border px-4 py-2">{new Date(patent.filingDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{patent.inventor}</td>
              <td className="border px-4 py-2">{patent.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatentFiling;
