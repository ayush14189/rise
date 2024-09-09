const mongoose = require('mongoose');

// Investment Schema
const investmentSchema = mongoose.Schema(
  {
    investor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Investor', // Reference to the Investor 
      required: true,
    },
    startupName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Startup', // Reference to the Investor model
        required: true,
    },
    amount: {
      type: Number, // Investment amount in USD or any currency
      required: true,
    },
    investmentDate: {
      type: Date,
      required: true,
    },
    equityPercentage: {
      type: Number, // The percentage of equity acquired in exchange for the investment
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Investment', investmentSchema);
