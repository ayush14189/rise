const mongoose = require('mongoose');
const { Schema } = mongoose;
const investorSchema = new Schema({
    investorName: { type: String, required: true },
    company: { type: String },
    contactDetails: { type: String },
    startupsInvestedIn: [{ type: Schema.Types.ObjectId, ref: 'Startup' }]  // List of startups' IDs
  }, { timestamps: true });
  
  const Investor = mongoose.model('Investor', investorSchema);
  module.exports = Investor;
  