const mongoose = require('mongoose');

const { Schema } = mongoose;
const researchProjectSchema = new Schema({
    title: { type: String, required: true }, // Project title
    description: { type: String }, // Detailed description of the project
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }], // List of collaborators
    startDate: { type: Date }, // Start date of the project
    endDate: { type: Date }, // End date of the project (if completed)
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' }, // Status of the project
    leadResearcher: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the researcher leading the project
  }, { timestamps: true });
  
  const ResearchProject = mongoose.model('ResearchProject', researchProjectSchema);
  module.exports = ResearchProject;
  