const MentorshipRequest = require('../models/MentorshipRequest'); // Adjust the path according to your project structure

// Create a new mentorship request
exports.createMentorshipRequest = async (req, res) => {
  try {
    const mentorshipRequest = new MentorshipRequest({
      startup_id: req.body.startup_id,
      type_of_mentorship: req.body.type_of_mentorship,
      duration_months: req.body.duration_months,
      specific_goals: req.body.specific_goals,
      preferred_mentor: req.body.preferred_mentor,
    });
    await mentorshipRequest.save();
    res.status(201).json(mentorshipRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all mentorship requests
exports.getMentorshipRequests = async (req, res) => {
  try {
    const mentorshipRequests = await MentorshipRequest.find();
    res.json(mentorshipRequests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a mentorship request by ID
exports.getMentorshipRequest = async (req, res) => {
  try {
    const mentorshipRequest = await MentorshipRequest.findById(req.params.id);
    if (!mentorshipRequest) return res.status(404).json({ message: 'Mentorship request not found' });
    res.json(mentorshipRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a mentorship request
exports.updateMentorshipRequest = async (req, res) => {
  try {
    const mentorshipRequest = await MentorshipRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!mentorshipRequest) return res.status(404).json({ message: 'Mentorship request not found' });
    res.json(mentorshipRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a mentorship request
exports.deleteMentorshipRequest = async (req, res) => {
  try {
    const mentorshipRequest = await MentorshipRequest.findByIdAndDelete(req.params.id);
    if (!mentorshipRequest) return res.status(404).json({ message: 'Mentorship request not found' });
    res.json({ message: 'Mentorship request deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
