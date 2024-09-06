const mongoose = require('mongoose');
const progressTrackingSchema = new mongoose.Schema({
    startup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
    },
    growth_stage: {
      type: String,
      required: true,
    },
    milestones: {
      type: String,
    },
    revenue_generated: {
      type: Number,
    },
    key_challenges: {
      type: String,
    },
    next_steps: {
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
  
  module.exports = mongoose.model('ProgressTracking', progressTrackingSchema);
  