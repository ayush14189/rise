const mongoose = require('mongoose');
const mentorshipRequestSchema = new mongoose.Schema({
    startup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
    },
    type_of_mentorship: {
      type: String,
      required: true,
    },
    duration_months: {
      type: Number,
    },
    specific_goals: {
      type: String,
    },
    preferred_mentor: {
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
  
  module.exports = mongoose.model('MentorshipRequest', mentorshipRequestSchema);
  