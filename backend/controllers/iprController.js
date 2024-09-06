const IPR = require('../models/IPR'); // Adjust the path according to your project structure

// Create a new IPR record
exports.createIPR = async (req, res) => {
  try {
    const ipr = new IPR({
      startup_id: req.body.startup_id,
      patent_number: req.body.patent_number,
      patent_type: req.body.patent_type,
      application_date: req.body.application_date,
      status: req.body.status,
      ipr_document_url: req.body.ipr_document_url,
    });
    await ipr.save();
    res.status(201).json(ipr);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all IPR records
exports.getIPRs = async (req, res) => {
  try {
    const iprs = await IPR.find();
    res.json(iprs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get an IPR record by ID
exports.getIPR = async (req, res) => {
  try {
    const ipr = await IPR.findById(req.params.id);
    if (!ipr) return res.status(404).json({ message: 'IPR record not found' });
    res.json(ipr);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an IPR record
exports.updateIPR = async (req, res) => {
  try {
    const ipr = await IPR.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!ipr) return res.status(404).json({ message: 'IPR record not found' });
    res.json(ipr);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an IPR record
exports.deleteIPR = async (req, res) => {
  try {
    const ipr = await IPR.findByIdAndDelete(req.params.id);
    if (!ipr) return res.status(404).json({ message: 'IPR record not found' });
    res.json({ message: 'IPR record deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
