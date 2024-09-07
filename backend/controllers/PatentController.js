const Patent = require('../models/Patent');

// Create new patent
exports.createPatent = async (req, res) => {
  try {
    const { patentNumber, title, description, filingDate, inventor, status } = req.body;

    // Check if the patent already exists
    const existingPatent = await Patent.findOne({ patentNumber });
    if (existingPatent) {
      return res.status(400).json({ message: 'Patent with this number already exists' });
    }

    // Create a new patent
    const newPatent = new Patent({
      patentNumber,
      title,
      description,
      filingDate,
      inventor,
      status
    });

    await newPatent.save();
    res.status(201).json(newPatent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all patents
exports.getPatents = async (req, res) => {
  try {
    const patents = await Patent.find();
    res.status(200).json(patents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get patent by ID
exports.getPatentById = async (req, res) => {
  try {
    const patent = await Patent.findById(req.params.id);

    if (!patent) {
      return res.status(404).json({ message: 'Patent not found' });
    }

    res.status(200).json(patent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update patent status
exports.updatePatentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Update the status of the patent by ID
    const updatedPatent = await Patent.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedPatent) {
      return res.status(404).json({ message: 'Patent not found' });
    }

    res.status(200).json(updatedPatent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

