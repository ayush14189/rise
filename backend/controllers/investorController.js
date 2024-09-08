const { User } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");

const Investor = require('../models/Investor');


// Create a new user and investor
exports.registerInvestor = async (req, res) => {
  const { email, password, confirmPassword, userType, name, investmentFocus, experienceLevel, phone, country } = req.body;

  // Validation

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Create a new user);
    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: 'Investor',
    });
    const newUser = await user.save();

    // Create a new investor
    const investor = new Investor({
      user_id: newUser._id,
      name,
      investmentFocus,
      experienceLevel,
      phone,
      country,
    });
    await investor.save();

    // Generate a token
    
    
    res.status(201).json({
      success: true,
      message: 'Investor registered successfully',
      token: generateToken(newUser._id,email),
      userType: newUser.userType,
      id: newUser._id,
      investor: {
        id: investor._id,
        name: investor.name,
        investmentFocus: investor.investmentFocus,
        experienceLevel: investor.experienceLevel,
        phone: investor.phone,
        country: investor.country,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update investor details
exports.updateInvestor = async (req, res) => {
  const { id } = req.params;
  const { name, investmentFocus, experienceLevel, phone, country } = req.body;

  try {
    const investor = await Investor.findById(id);
    if (!investor) {
      return res.status(404).json({ success: false, message: 'Investor not found' });
    }

    investor.name = name || investor.name;
    investor.investmentFocus = investmentFocus || investor.investmentFocus;
    investor.experienceLevel = experienceLevel || investor.experienceLevel;
    investor.phone = phone || investor.phone;
    investor.country = country || investor.country;

    await investor.save();

    res.status(200).json({
      success: true,
      message: 'Investor details updated successfully',
      investor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get investor details
exports.getInvestor = async (req, res) => {
  const { id } = req.params;

  try {
    const investor = await Investor.findById(id);
    if (!investor) {
      return res.status(404).json({ success: false, message: 'Investor not found' });
    }

    res.status(200).json({
      success: true,
      investor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete investor
exports.deleteInvestor = async (req, res) => {
  const { id } = req.params;

  try {
    const investor = await Investor.findById(id);
    if (!investor) {
      return res.status(404).json({ success: false, message: 'Investor not found' });
    }

    await Investor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Investor deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getInvestorByUserId = async (req, res) => {
  try {
      const user_id = req.params.userId;
      if (!user_id) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      const userInfo = await Investor.find({user_id});
      if (!userInfo) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(userInfo);
  } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};