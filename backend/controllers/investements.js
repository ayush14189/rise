const Investment = require('../models/Investment');

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