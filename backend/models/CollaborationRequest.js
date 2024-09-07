const mongoose = require('mongoose');
const collaborationRequestSchema = new mongoose.Schema({
    researchProject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResearchProject',
      required: true,
    },
    collaborator_name: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
    },
    expected_outcome: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
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
  
  module.exports = mongoose.model('CollaborationRequest', collaborationRequestSchema);
  