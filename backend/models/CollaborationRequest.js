const mongoose = require('mongoose');
const collaborationRequestSchema = new mongoose.Schema({
    startup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
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
  