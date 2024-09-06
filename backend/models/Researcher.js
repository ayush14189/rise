const mongoose = require('mongoose');
const { Schema } = mongoose;
const researcherSchema = new Schema({
  institution: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'ResearchProject' }],  // List of research projects  // List of collaborators
  investors: [{ type: Schema.Types.ObjectId, ref: 'Investor' }], // List of investors' IDs
  iprSubmissions: [{ type: Schema.Types.ObjectId, ref: 'IPR' }]  // List of IPR submissions
}, { timestamps: true });

const Researcher = mongoose.model('Researcher', researcherSchema);
module.exports = Researcher;
