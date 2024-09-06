const { GovtAgency } = require("../models");
const { User } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");

const signupGovtAgency = async (req, res) => {
    try {
      const { officerName, email, password, agencyName, contactNumber,RegistrationNo,agencyType } = req.body;
      
      // Create the government agency document
      const govtAgency = new GovtAgency({
        agencyName,
        RegistrationNo,
        contactNumber,
        agencyType

      });
      await govtAgency.save();
  
      // Create the user document and associate it with the govt agency
      const user = new User({
        name:officerName,
        email,
        password,  // Note: Password should be hashed
        userType: 'govtAgency',
        govtAgency: govtAgency._id
      });
      await user.save();
  
      res.status(201).json({ success: true, message: 'Government Agency registered successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
    }
  };
module.exports = {signupGovtAgency};
  