import React, { useState } from 'react';

const ViewEditStartup = () => {
  // State to toggle between view and edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const startupJson = localStorage.getItem('userInfo');
  const startup = JSON.parse(startupJson);
  console.log("startup details", startup);
  const [formData, setFormData] = useState({ ...startup });
  console.log("form details", formData);
  
  // Handle input changes for editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (edit/save action)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        const response = await fetch(`http://localhost:5000/api/user/startup/${formData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Startup data updated successfully:', result);
          // Optionally update localStorage or UI here with the new data
          localStorage.setItem('userInfo', JSON.stringify(formData));
        } else {
          console.error('Failed to update startup data.');
        }
      } catch (error) {
        console.error('Error while updating startup data:', error);
      }
    }

    setIsEditMode(!isEditMode); // Toggle mode
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? 'Edit Startup Details' : 'View Startup Details'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Startup Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Startup Name</label>
          <input
            type="text"
            name="startup_name"
            value={formData.startup_name}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Founder */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Founder</label>
          <input
            type="text"
            name="founder_name"
            value={formData.founder_name}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Incorporation Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Incorporation Date</label>
          <input
            type="date"
            name="incorporation_date"
            value={ startup?.incorporation_date
              ? new Date(startup.incorporation_date).toISOString().split('T')[0]
              : ''}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Industry */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Industry Sector</label>
          <input
            type="text"
            name="industry_sector"
            value={formData.industry_sector}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Business Stage */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Business Stage</label>
          <select
            name="business_stage"
            value={formData.business_stage}
            disabled={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Idea">Idea</option>
            <option value="Seed">Seed</option>
            <option value="Growth">Growth</option>
          </select>
        </div>

        {/* Employees Count */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Employees Count</label>
          <input
            type="number"
            name="employees_count"
            value={formData.employees_count}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Website URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Pitch Deck URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pitch Deck URL</label>
          <input
            type="url"
            name="pitch_deck_url"
            value={formData.pitch_deck_url}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit and Edit Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className={`px-4 py-2 text-white ${isEditMode ? 'bg-blue-500' : 'bg-green-500'} rounded-md`}
          >
            {isEditMode ? 'Save' : 'Edit'}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ViewEditStartup;
