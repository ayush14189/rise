const CollaborationRequest = require('../models/CollaborationRequest'); // Adjust the path according to your project structure

// Create a new collaboration request
exports.createCollaborationRequest = async (req, res) => {
  try {
    const collaborationRequest = new CollaborationRequest({
      researchProject_id: req.body.researchProject_id,
      collaborator_name: req.body.collaborator_name,
      purpose: req.body.purpose,
      expected_outcome: req.body.expected_outcome,
      status: req.body.status,
    });
    await collaborationRequest.save();
    res.status(201).json(collaborationRequest);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all collaboration requests
exports.getCollaborationRequests = async (req, res) => {
  try {
    const collaborationRequests = await CollaborationRequest.find().populate('researchProject_id');;
    
    res.json(collaborationRequests);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get a collaboration request by ID
exports.getCollaborationRequest = async (req, res) => {
  try {
    const collaborationRequest = await CollaborationRequest.findById(req.params.id);
    if (!collaborationRequest) return res.status(404).json({ message: 'Collaboration request not found' });
    res.json(collaborationRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a collaboration request
exports.updateCollaborationRequest = async (req, res) => {
  try {
    const collaborationRequest = await CollaborationRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!collaborationRequest) return res.status(404).json({ message: 'Collaboration request not found' });
    res.json(collaborationRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a collaboration request
exports.deleteCollaborationRequest = async (req, res) => {
  try {
    const collaborationRequest = await CollaborationRequest.findByIdAndDelete(req.params.id);
    if (!collaborationRequest) return res.status(404).json({ message: 'Collaboration request not found' });
    res.json({ message: 'Collaboration request deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
