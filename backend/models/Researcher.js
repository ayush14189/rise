const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const researcherSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  affiliation: { type: String },
  researchInterests: [String],
   // URL or path to profile picture
  // Add any other relevant fields
}, { timestamps: true });

module.exports = mongoose.model('Researcher', researcherSchema);
