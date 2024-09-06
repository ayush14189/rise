const { User } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");

const signupInvestor = async (req, res) => {
    try {
      const { name, email, password, investorName, company, contactDetails } = req.body;
  
      // Create the investor document
      const investor = new Investor({
        investorName,
        company,
        contactDetails
      });
      await investor.save();
  
      // Create the user document and associate it with the investor
      const user = new User({
        name,
        email,
        password,  // Note: Password should be hashed
        userType: 'investor',
        investor: investor._id
      });
      await user.save();
  
      res.status(201).json({ success: true, message: 'Investor registered successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
    }
  };
module.exports = {signupInvestor};  