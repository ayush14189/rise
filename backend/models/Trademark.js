const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trademarkSchema = new Schema({
    trademarkNumber: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    filingDate: {
      type: Date
    },
    registrationDate: {
      type: Date
    },
    owner: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Registered', 'Rejected'],
      default: 'Pending'
    },
    researchProject: {
      type: Schema.Types.ObjectId,
      ref: 'ResearchProject'
    }, // Reference to the related research project
    created_at: {
      type: Date,
      default: Date.now,
    }
    // Add any other relevant fields
  },
  {
    timestamps: true
  });
 
  module.exports = mongoose.model('Trademark', trademarkSchema);