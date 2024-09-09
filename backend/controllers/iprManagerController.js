const IPR = require('../models/IPR'); // Adjust the path according to your project structure
const Trademark = require('../models/Trademark'); // Adjust the path according to your project structure
const Patent = require('../models/Patent'); // Adjust the path according to your project structure
const IprManager = require('../models/IprManager'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { verifyGST } = require("../middleware");
// Controller function to handle signup
exports.signupIprManager = async (req, res) => {
    try {
        const { name,email,password, phone, company, role, country, industryFocus, yearsOfExperience } = req.body;

        // Validate required fields
        if (!name || !phone || !country) {
            return res.status(400).json({ error: 'Name, phone, and country are required' });
        }
        const user = new User({
          email: req.body.email,
          password: await generateHashedPassword(password),
          userType: "IprManager",
        });
        await user.save();

        // Create a new IprManager instance
        const newIprManager = new IprManager({
            user_id: user._id,
            name,
            phone,
            company,
            role,
            country,
            industryFocus,
            yearsOfExperience,
        });

        // Save the instance to the database
        const savedIprManager = await newIprManager.save();

        // Send success response
        res.status(201).json(savedIprManager);
    } catch (error) {
        console.error('Error signing up IPR Manager:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch all Pending IPR applications
exports.getIPRs = async (req, res) => {
  try {
    const iprs = await IPR.find({ status: 'Pending' }).populate('startup_id');
    res.json(iprs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Approve an IPR application
exports.approveIPR = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await IPR.findById(applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = 'Granted';
    application.updated_at = Date.now();
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


// Reject an IPR application
exports.rejectIPR = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await IPR.findById(applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = 'Rejected';
    application.updated_at = Date.now();
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


// Fetch all Pending trademark applications
exports.getTrademarks = async (req, res) => {
  try {
    const trademarks = await Trademark.find({ status: 'Pending' }).populate('startup_id');
    res.json(trademarks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Approve a trademark application
exports.approveTrademark = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await Trademark.findById(applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = 'Registered';
    application.updated_at = Date.now();
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


// Reject a trademark application
exports.rejectTrademark = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await Trademark.findById(applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = 'Rejected';
    application.updated_at = Date.now();
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


// Fetch all Pending patent applications
exports.getPatents = async (req, res) => {
  try {
    const patents = await Patent.find({ status: 'Pending' }).populate('researchProject');
    res.json(patents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Approve a patent application
exports.approvePatent = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await Patent.findById(applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = 'Granted';
    application.updated_at = Date.now();
    await application.save();
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// Reject a patent application
exports.rejectPatent = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await Patent.findById(applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = 'Rejected';
    application.updated_at = Date.now();
    await application.save();
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// Fetch applications filed each month
exports.getApplicationsByMonth = async (req, res) => {
  try {
    const iprs = await IPR.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
          count: { $sum: 1 }
        }
      }
    ]);


    const trademarks = await Trademark.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
          count: { $sum: 1 }
        }
      }
    ]);


    const patents = await Patent.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
          count: { $sum: 1 }
        }
      }
    ]);


    res.json({ iprs, trademarks, patents });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Fetch total applications by category
exports.getTotalApplications = async (req, res) => {
  try {
    const totalIPRs = await IPR.countDocuments();
    const totalTrademarks = await Trademark.countDocuments();
    const totalPatents = await Patent.countDocuments();


    res.json({ totalIPRs, totalTrademarks, totalPatents });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Fetch applications by status
exports.getApplicationsByStatus = async (req, res) => {
  try {
    const iprStatusCounts = await IPR.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);


    const trademarkStatusCounts = await Trademark.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);


    const patentStatusCounts = await Patent.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);


    res.json({ iprStatusCounts, trademarkStatusCounts, patentStatusCounts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
