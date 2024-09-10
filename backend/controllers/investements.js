const Investment = require('../models/Investment');
const mongoose = require('mongoose');
// Create new investment
exports.createInvestment = async (req, res) => {
  try {
    const { investor_id, startupName, amount, investmentDate, equityPercentage } = req.body;

    const newInvestment = new Investment({
      investor_id,
      startupName,
      amount,
      investmentDate,
      equityPercentage,
    });

    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all investments based on investor_id
exports.getAllInvestmentsByInvestorId = async (req, res) => {
  try {
    const investor_id = req.params.investor_id;
    console.log('Investor ID:', investor_id);

    // Convert investor_id to ObjectId if necessary
    const objectId = mongoose.Types.ObjectId(investor_id);

    const investments = await Investment.find({ investor_id: objectId }).populate('startupName');

    if (!investments) {
      return res.status(404).json({ message: 'No investments found for this investor' });
    }

    res.status(200).json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ message: error.message });
  }
};