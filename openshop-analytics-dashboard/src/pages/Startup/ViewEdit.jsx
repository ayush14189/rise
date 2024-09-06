import React, { useState } from 'react';

const ViewEditStartup = () => {
  // State to toggle between view and edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const startupJson = localStorage.getItem('userInfo');
  const startup = JSON.parse(startupJson);
  console.log("startup details",startup);
  const [formData, setFormData] = useState({ ...startup });
    console.log("form details",formData);
  // Handle input changes for editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (edit/save action)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Logic for saving the updated form data (API call, etc.)
      console.log('Save startup data:', formData);
    }
    setIsEditMode(!isEditMode); // Toggle mode
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Startup Details' : 'View Startup Details'}</h2>

      <form onSubmit={handleSubmit}>
        {/* Startup Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Startup Name</label>
          <input
            type="text"
            name="startupName"
            value={startup.name}
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
            name="founder"
            value={formData.founder}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Registration Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Registration Date</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Industry */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
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

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            disabled={!isEditMode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
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