const FundingRequest = require('../models/FundingRequest'); // Adjust the path according to your project structure

// Create a new funding request
exports.createFundingRequest = async (req, res) => {
  try {
    const fundingRequest = new FundingRequest({
      startup_id: req.body.startup_id,
      requestedAmount: req.body.requestedAmount,
      proposedEquity: req.body.proposedEquity,
      status:'pending',
      purpose: req.body.purpose,
      
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
    const fundingRequests = await FundingRequest.find().populate('startup_id investor_id');
    res.json(fundingRequests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a funding request by ID
exports.getFundingRequest = async (req, res) => {
  try {
    const { startupId } = req.params;  // Get the startupId from the request params

    // Fetch all funding requests that belong to the given startupId
    const fundingRequests = await FundingRequest.find({ startupId }).populate('startup_id investor_id');

    if (fundingRequests.length === 0) {
      return res.status(404).json({ message: 'No funding requests found for this startup' });
    }

    res.json(fundingRequests);
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
