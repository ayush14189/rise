const { User } = require("../models");
const { Startup } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");
const signupStartup = async (req, res) => {
    try {
      const { name, email, password, companyName, gstNumber, foundingYear,panNumber,startupDomain,startupOwner } = req.body;
  
      // Create the startup document
      const startup = new Startup({
        companyName,
        gstNumber,
        panNumber,
        startupDomain,
        startupOwner,
        foundingYear
      });
      await startup.save();
  
      // Create the user document and associate it with the startup
      const user = new User({
        name,
        email,
        password:await generateHashedPassword(password),  // Note: Password should be hashed
        userType: 'startup',
        startup: startup._id
      });
      await user.save();
      
      res.status(201).json({ success: true, message: 'Startup registered successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
    }
  };
module.exports = {signupStartup};