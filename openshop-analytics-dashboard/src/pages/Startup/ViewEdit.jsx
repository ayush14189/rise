import React, { useState } from 'react';


const ViewEditStartup = () => {
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
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">
        {isEditMode ? 'Edit Startup Details' : 'View or Edit Your Details'}
      </h2>


      <form onSubmit={handleSubmit}>
        {/* Startup Name */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Startup Name</label>
          <input
            type="text"
            name="startup_name"
            value={formData.startup_name}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Founder */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Founder</label>
          <input
            type="text"
            name="founder_name"
            value={formData.founder_name}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Incorporation Date */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Incorporation Date</label>
          <input
            type="date"
            name="incorporation_date"
            value={startup?.incorporation_date
              ? new Date(startup.incorporation_date).toISOString().split('T')[0]
              : ''}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Industry */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Industry Sector</label>
          <input
            type="text"
            name="industry_sector"
            value={formData.industry_sector}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
            rows="4"
          />
        </div>


        {/* Business Stage */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Business Stage</label>
          <select
            name="business_stage"
            value={formData.business_stage}
            disabled={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          >
            <option value="Idea">Idea</option>
            <option value="Seed">Seed</option>
            <option value="Growth">Growth</option>
          </select>
        </div>


        {/* Employees Count */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Employees Count</label>
          <input
            type="number"
            name="employees_count"
            value={formData.employees_count}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Website URL */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Pitch Deck URL */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-700">Pitch Deck URL</label>
          <input
            type="url"
            name="pitch_deck_url"
            value={formData.pitch_deck_url}
            readOnly={!isEditMode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
          />
        </div>


        {/* Submit and Edit Buttons */}
        <div className="flex justify-between mt-10">
          <button
            type="submit"
            className={`px-6 py-3 font-semibold text-white ${isEditMode ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-green-400 to-green-600'} rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out`}
          >
            {isEditMode ? 'Save' : 'Edit'}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
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
