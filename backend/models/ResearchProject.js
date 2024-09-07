const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const researchProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  category: { type: String},
  endDate: { type: Date },
  status: { type: String, enum: ['Active', 'Completed', 'On Hold'], default: 'Active' },
  researchers: [{ type: Schema.Types.ObjectId, ref: 'Researcher' }], // References to researchers involved
  patents: [{ type: Schema.Types.ObjectId, ref: 'Patent' }], // References to related patents
  trademarks: [{ type: Schema.Types.ObjectId, ref: 'Trademark' }], // References to related trademarks
  // Add any other relevant fields
}, { timestamps: true });

module.exports = mongoose.model('ResearchProject', researchProjectSchema);
