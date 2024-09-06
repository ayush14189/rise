const mongoose = require('mongoose');
const iprSchema = new mongoose.Schema({
  startup_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup',
    required: true,
  },
  patent_number: {
    type: String,
  },
  patent_type: {
    type: String,
    enum: ['Utility', 'Design'],
  },
  application_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'Granted', 'Rejected'],
  },
  ipr_document_url: {
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

module.exports = mongoose.model('IPR', iprSchema);
