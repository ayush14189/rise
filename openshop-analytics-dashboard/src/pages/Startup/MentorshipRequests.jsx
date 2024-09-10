import React, { useState } from 'react';


const MentorshipRequest = () => {
  // Mock list of mentors
  const mockMentors = [
    { id: 1, name: 'Dr. Sarah Johnson', expertise: 'AI & Machine Learning' },
    { id: 2, name: 'Mr. Krish Sharma', expertise: 'Business Development' },
    { id: 3, name: 'Ms. Mahika', expertise: 'Product Management' },
  ];


  const [selectedMentor, setSelectedMentor] = useState(null); // Track selected mentor
  const [formData, setFormData] = useState({
    mentorType: '',
    description: '',
    duration: ''
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
      mentorType: '',
      description: '',
      duration: ''
    });


    // Clear selected mentor
    setSelectedMentor(null);
  };


  // Handle mentor selection
  const selectMentor = (mentor) => {
    setSelectedMentor(mentor);
    setFormData({
      mentorType: mentor.name,
      description: '',
      duration: ''
    });
  };


  return (
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl mt-12">
      {/* Mentor List */}
      {!selectedMentor && (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">Available Mentors</h2>
          <ul>
            {mockMentors.map((mentor) => (
              <li key={mentor.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <div>
                  <p className="font-semibold text-gray-700">{mentor.name}</p>
                  <p className="text-sm text-gray-600">Expertise: {mentor.expertise}</p>
                </div>
                <button
                  onClick={() => selectMentor(mentor)}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Request Mentorship
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Mentorship Request Form */}
      {selectedMentor && (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">Submit a Mentorship Request</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3 text-gray-700" htmlFor="mentorType">Mentor</label>
              <input
                type="text"
                id="mentorType"
                name="mentorType"
                value={formData.mentorType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
                readOnly
              />
            </div>


            <div className="mb-8">
              <label className="block text-sm font-medium mb-3 text-gray-700" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
                placeholder="Describe your need for mentorship"
                rows="4"
                required
              ></textarea>
            </div>


            <div className="mb-8">
              <label className="block text-sm font-medium mb-3 text-gray-700" htmlFor="duration">Duration (in months)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
                placeholder="Enter duration of mentorship"
                required
              />
            </div>


            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={() => setSelectedMentor(null)}
                className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}


      {/* Table to display submitted requests */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 tracking-wide">Submitted Requests</h2>
      {submittedRequests.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">Mentor</th>
              <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">Description</th>
              <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">Duration (months)</th>
              <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {submittedRequests.map((request, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b text-gray-700">{request.mentorType}</td>
                <td className="py-4 px-6 border-b text-gray-700">{request.description}</td>
                <td className="py-4 px-6 border-b text-gray-700">{request.duration}</td>
                <td className="py-4 px-6 border-b text-gray-700">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center mt-6">No mentorship requests submitted yet.</p>
      )}
    </div>
  );
};


export default MentorshipRequest;