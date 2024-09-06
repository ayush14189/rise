import React, { useState } from 'react';

const MentorshipRequest = () => {
  // Mock list of mentors
  const mockMentors = [
    { id: 1, name: 'Dr. Sarah Johnson', expertise: 'AI & Machine Learning' },
    { id: 2, name: 'Mr. John Doe', expertise: 'Business Development' },
    { id: 3, name: 'Ms. Emily Davis', expertise: 'Product Management' },
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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Mentor List */}
      {!selectedMentor && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Mentors</h2>
          <ul>
            {mockMentors.map((mentor) => (
              <li key={mentor.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md">
                <div>
                  <p className="font-semibold">{mentor.name}</p>
                  <p className="text-sm text-gray-600">Expertise: {mentor.expertise}</p>
                </div>
                <button
                  onClick={() => selectMentor(mentor)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
          <h2 className="text-2xl font-bold mb-4">Submit a Mentorship Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="mentorType">Mentor</label>
              <input
                type="text"
                id="mentorType"
                name="mentorType"
                value={formData.mentorType}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Describe your need for mentorship"
                required
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="duration">Duration (in months)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter duration of mentorship"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setSelectedMentor(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table to display submitted requests */}
      <h2 className="text-2xl font-bold mb-4">Submitted Mentorship Requests</h2>
      {submittedRequests.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Mentor</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Duration (months)</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {submittedRequests.map((request, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{request.mentorType}</td>
                <td className="py-2 px-4 border-b">{request.description}</td>
                <td className="py-2 px-4 border-b">{request.duration}</td>
                <td className="py-2 px-4 border-b">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No mentorship requests submitted yet.</p>
      )}
    </div>
  );
};

export default MentorshipRequest;
