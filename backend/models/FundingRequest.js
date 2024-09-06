const mongoose = require('mongoose');
const fundingRequestSchema = new mongoose.Schema({
    startup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
    },
    amount_requested: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
    },
    funding_status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    supporting_documents: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('FundingRequest', fundingRequestSchema);
  