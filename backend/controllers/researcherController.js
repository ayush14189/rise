const { User } = require("../models");
const { Researcher } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");

const signupResearcher = async (req, res) => {
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
module.exports = {signupResearcher};