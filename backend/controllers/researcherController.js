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
      const { name, email, password, institution} = req.body;
  
      // Create the researcher document
      const researcher = new Researcher({
        institution
      });
      await researcher.save();
  
      // Create the user document and associate it with the researcher
      const user = new User({
        name,
        email,
        password,  // Note: Password should be hashed
        userType: 'researcher',
        researcher: researcher._id
      });
      await user.save();
  
      res.status(201).json({ success: true, message: 'Researcher registered successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
    }
  };
module.exports = {signupResearcher};