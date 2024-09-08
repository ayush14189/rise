const mongoose = require('mongoose');
const investorSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    investmentFocus: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    // Additional fields from the frontend componen
  },
  { timestamps: true }
);
module.exports = mongoose.model('Investor', investorSchema);