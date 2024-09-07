import React, { useState,useEffect } from 'react';


const CollaborationRequest = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetchProjects();
    fetchCollaborationRequests();
  }, []);
  const fetchCollaborationRequests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/collaboration-requests`);
      const data = await response.json();
      setSentRequests(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  
  }
  const fetchProjects = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/research-projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  // Mock data for research projects
  
  // State to manage the form visibility and request details
  const [selectedProject, setSelectedProject] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [expected_outcome, setExpectedOutcome] = useState('');
  const [sentRequests, setSentRequests] = useState([]);
  const [collaborator_name, setCollaboratorName] = useState('');
  // Handle sending collaboration request
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
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
  
    // Reset form
    setSelectedProject(null);
    setPurpose('');
    setExpectedOutcome('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Collaboration Requests</h2>

      {/* List of Research Projects */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Research Projects</h3>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md">
              <div>
                <p className="font-semibold">{project.title}</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Request Collaboration
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collaboration Request Form */}
      {selectedProject && (
        <div className="mb-8 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-2xl font-bold mb-4">Request Collaboration on "{selectedProject.title}"</h3>
          <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Collaborator Name</label>
          <input
            type="text"
            name="collaborator_name"
            value={collaborator_name}
            onChange={(e) => setCollaboratorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expected Outcome</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={expected_outcome}
              onChange={(e) => setExpectedOutcome(e.target.value)}
            />
          </div>
          <button
            onClick={handleSendRequest}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit Request
          </button>
        </div>
      )}

      {/* Display Sent Collaboration Requests */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Sent Collaboration Requests</h3>
        {sentRequests.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Research Project</th>
                <th className="py-2 px-4 border-b">Purpose</th>
                <th className="py-2 px-4 border-b">Expected Outcome</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {sentRequests.map((request) => (
                <tr key={request.id}>
                  <td className="py-2 px-4 border-b">{request.researchProject_id.title}</td>
                  <td className="py-2 px-4 border-b">{request.purpose}</td>
                  <td className="py-2 px-4 border-b">{request.expected_outcome}</td>
                  <td className="py-2 px-4 border-b">{request.status}</td>
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
