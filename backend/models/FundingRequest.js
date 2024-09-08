const mongoose = require('mongoose');

const fundingRequestSchema = new mongoose.Schema(
  {
    startup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
    },
    investor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Investor',
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    proposedEquity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'countered'],
      default: 'pending',
    },
    
    // Counter Offer Fields
    counterAmount: {
      type: Number,  // Amount the other party proposes
    },
    counterEquity: {
      type: Number,  // Equity the other party proposes
    },
    negotiationMessage: {
      type: String,  // Optional message related to the negotiation
    },

    
  
  },
  { timestamps: true }
);

module.exports = mongoose.model('FundingRequest', fundingRequestSchema);
