const { User } = require("../models");
const { Startup } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");
 // Adjust the path according to your project structure

// Create a new startup
exports.createStartup = async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  console.log(password);
  try {
    const user = new User({
      email: req.body.email,
      password: await generateHashedPassword(password),
      userType: req.body.userType,
    });
    await user.save();
    try {
      const startup = new Startup({
        user_id: user._id,
        startup_name: req.body.startup_name,
        founder_name: req.body.founder_name,
        industry_sector: req.body.industry_sector,
        description: req.body.description,
        business_stage: req.body.business_stage,
        incorporation_date: req.body.incorporation_date,
        employees_count: req.body.employees_count,
        website_url: req.body.website_url,
        pitch_deck_url: req.body.pitch_deck_url,
      });
      await startup.save();
      res.status(201).json(startup);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
  
};

// Get all startups
exports.getStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a startup by ID
exports.getStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a startup
exports.updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a startup
exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findByIdAndDelete(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json({ message: 'Startup deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getStartupByUserId = async (req, res) => {
  try {
      const user_id = req.params.userId;
      if (!user_id) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      const userInfo = await Startup.find({user_id});
      if (!userInfo) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(userInfo);
  } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};