const ProgressTracking = require('../models/ProgressTracking'); // Adjust the path according to your project structure

// Create a new progress tracking record
exports.createProgressTracking = async (req, res) => {
  try {
    const progressTracking = new ProgressTracking({
      startup_id: req.body.startup_id,
      growth_stage: req.body.growth_stage,
      milestones: req.body.milestones,
      revenue_generated: req.body.revenue_generated,
      key_challenges: req.body.key_challenges,
      next_steps: req.body.next_steps,
    });
    await progressTracking.save();
    res.status(201).json(progressTracking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all progress tracking records
exports.getProgressTrackings = async (req, res) => {
  try {
    const progressTrackings = await ProgressTracking.find();
    res.json(progressTrackings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a progress tracking record by ID
exports.getProgressTracking = async (req, res) => {
  try {
    const progressTracking = await ProgressTracking.findById(req.params.id);
    if (!progressTracking) return res.status(404).json({ message: 'Progress tracking not found' });
    res.json(progressTracking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a progress tracking record
exports.updateProgressTracking = async (req, res) => {
  try {
    const progressTracking = await ProgressTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!progressTracking) return res.status(404).json({ message: 'Progress tracking not found' });
    res.json(progressTracking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a progress tracking record
exports.deleteProgressTracking = async (req, res) => {
  try {
    const progressTracking = await ProgressTracking.findByIdAndDelete(req.params.id);
    if (!progressTracking) return res.status(404).json({ message: 'Progress tracking not found' });
    res.json({ message: 'Progress tracking deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
