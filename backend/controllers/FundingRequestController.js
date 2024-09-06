const FundingRequest = require('../models/FundingRequest'); // Adjust the path according to your project structure

// Create a new funding request
exports.createFundingRequest = async (req, res) => {
  try {
    const fundingRequest = new FundingRequest({
      startup_id: req.body.startup_id,
      amount_requested: req.body.amount_requested,
      purpose: req.body.purpose,
      funding_status: req.body.funding_status,
      supporting_documents: req.body.supporting_documents,
    });
    await fundingRequest.save();
    res.status(201).json(fundingRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all funding requests
exports.getFundingRequests = async (req, res) => {
  try {
    const fundingRequests = await FundingRequest.find();
    res.json(fundingRequests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a funding request by ID
exports.getFundingRequest = async (req, res) => {
  try {
    const fundingRequest = await FundingRequest.findById(req.params.id);
    if (!fundingRequest) return res.status(404).json({ message: 'Funding request not found' });
    res.json(fundingRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a funding request
exports.updateFundingRequest = async (req, res) => {
  try {
    const fundingRequest = await FundingRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!fundingRequest) return res.status(404).json({ message: 'Funding request not found' });
    res.json(fundingRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a funding request
exports.deleteFundingRequest = async (req, res) => {
  try {
    const fundingRequest = await FundingRequest.findByIdAndDelete(req.params.id);
    if (!fundingRequest) return res.status(404).json({ message: 'Funding request not found' });
    res.json({ message: 'Funding request deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
