const mongoose = require('mongoose');
const startupSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startup_name: {
    type: String,
    required: true,
  },
  founder_name: {
    type: String,
    required: true,
  },
  industry_sector: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  business_stage: {
    type: String,
    enum: ['Idea', 'Seed', 'Growth'],
    required: true,
  },
  incorporation_date: {
    type: Date,
  },
  employees_count: {
    type: Number,
  },
  website_url: {
    type: String,
  },
  pitch_deck_url: {
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

module.exports = mongoose.model('Startup', startupSchema);

