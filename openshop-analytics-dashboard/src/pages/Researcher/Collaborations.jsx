import React, { useState, useEffect } from 'react';

const CollaborationRequest = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetchProjects();
    fetchCollaborationRequests();
  }, []);

  const fetchCollaborationRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/collaboration-requests');
      const data = await response.json();
      setSentRequests(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching collaboration requests:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/research-projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [expected_outcome, setExpectedOutcome] = useState('');
  const [sentRequests, setSentRequests] = useState([]);
  const [collaborator_name, setCollaboratorName] = useState('');

  const handleSendRequest = async () => {
    const newRequest = {
      researchProject_id: selectedProject._id,
      collaborator_name,
      purpose,
      expected_outcome,
      status: 'Pending'
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/collaboration-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });

      if (response.ok) {
        console.log('Collaboration request sent successfully');
      } else {
        console.error('Failed to send collaboration request');
      }
    } catch (error) {
      console.error('Error sending collaboration request:', error);
    }

    fetchCollaborationRequests();
    setSelectedProject(null);
    setPurpose('');
    setExpectedOutcome('');
  };

  return (
    <div className="p-10 max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl mt-12">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-700 tracking-wide">
        Collaboration Requests
      </h2>

      {/* List of Research Projects */}
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-6 text-gray-700 tracking-wide">
          Research Projects
        </h3>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <div>
                <p className="font-semibold text-xl">{project.title}</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Request Collaboration
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collaboration Request Form */}
      {selectedProject && (
        <div className="mb-10 p-8 bg-white rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-6 text-gray-700">
            Request Collaboration on "{selectedProject.title}"
          </h3>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Collaborator Name</label>
            <input
              type="text"
              name="collaborator_name"
              value={collaborator_name}
              onChange={(e) => setCollaboratorName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <textarea
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Expected Outcome</label>
            <textarea
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
              value={expected_outcome}
              onChange={(e) => setExpectedOutcome(e.target.value)}
            />
          </div>
          <button
            onClick={handleSendRequest}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Submit Request
          </button>
        </div>
      )}

      {/* Sent Collaboration Requests */}
      <div>
        <h3 className="text-3xl font-bold mb-6 text-gray-700 tracking-wide">
          Sent Collaboration Requests
        </h3>
        {sentRequests.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Research Project</th>
                <th className="py-3 px-6 text-left">Purpose</th>
                <th className="py-3 px-6 text-left">Expected Outcome</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {sentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                  <td className="py-3 px-6 border-b">{request.researchProject_id.title}</td>
                  <td className="py-3 px-6 border-b">{request.purpose}</td>
                  <td className="py-3 px-6 border-b">{request.expected_outcome}</td>
                  <td className="py-3 px-6 border-b">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No collaboration requests sent yet.</p>
        )}
      </div>
    </div>
  );
};

export default CollaborationRequest;