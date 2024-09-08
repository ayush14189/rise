const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patentSchema = new Schema({
    patentNumber: {
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
    inventor: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Granted', 'Rejected'],
      default: 'Pending'
    },
    researchProject: {
      type: Schema.Types.ObjectId,
      ref: 'ResearchProject'
    }, // Reference to the related research project
    // Add any other relevant fields
  },
  {
    timestamps: true
  });
 
  module.exports = mongoose.model('Patent', patentSchema);