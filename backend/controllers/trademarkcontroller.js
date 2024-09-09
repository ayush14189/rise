const Trademark = require('../models/Trademark');

// Create new trademark
exports.createTrademark = async (req, res) => {
  try {
    const { trademarkNumber, title, description, filingDate, registrationDate, owner, status } = req.body;

    // Check if the trademark already exists
    const existingTrademark = await Trademark.findOne({ trademarkNumber });
    if (existingTrademark) {
      return res.status(400).json({ message: 'Trademark with this number already exists' });
    }

    // Create a new trademark
    const newTrademark = new Trademark({
      trademarkNumber,
      title,
      description,
      filingDate,
      registrationDate,
      owner,
      status
    });

    await newTrademark.save();
    res.status(201).json(newTrademark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trademarks
exports.getTrademarks = async (req, res) => {
  try {
    const trademarks = await Trademark.find();
    res.status(200).json(trademarks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get trademark by ID
exports.getTrademarkById = async (req, res) => {
  try {
    const trademark = await Trademark.findById(req.params.id);

    if (!trademark) {
      return res.status(404).json({ message: 'Trademark not found' });
    }

    res.status(200).json(trademark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update trademark status
exports.updateTrademarkStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Update the status of the trademark by ID
    const updatedTrademark = await Trademark.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedTrademark) {
      return res.status(404).json({ message: 'Trademark not found' });
    }

    res.status(200).json(updatedTrademark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};