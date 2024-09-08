const { User } = require("../models");
const { Researcher } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");

exports.signupResearcher = async (req, res) => {
    try {
      const { name, email, password, affialation,researchInterests} = req.body;

      const user = new User({
        email,
        password: await generateHashedPassword(password),  
        userType: 'researcher',
      });
      await user.save();
      const researcher = new Researcher({
        user_id: user._id,
        name,
        affialation,
        researchInterests,
      });
      await researcher.save();
      
      res.status(201).json({ success: true, message: 'Researcher registered successfully', data: researcher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
    }
  };

exports.getResearcherByUserId = async (req, res) => {
  try {
      const user_id = req.params.userId;
      if (!user_id) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      const userInfo = await Researcher.find({user_id});
      if (!userInfo) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(userInfo);
  } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};