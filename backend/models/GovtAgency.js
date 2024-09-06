const mongoose = require('mongoose');
const { Schema } = mongoose;
const govtAgencySchema = new Schema({
  agencyName: { type: String, required: true },       // Official name of the government agency
  RegistrationNo: { type: String, required: true, unique: true }, // Government registration number
   // Official email (should be validated for .gov domain)
      // Name of the authorized contact person
  // contactPersonPosition: { type: String, required: true },  // Position/designation of the contact person                      // Full address of the government agency
  contactNumber: { type: String, required: true }, // Contact phone number
  agencyType: { type: String, required: true }, // Government department or ministry name
}, { timestamps: true });
  
  const GovtAgency = mongoose.model('GovtAgency', govtAgencySchema);
  module.exports = GovtAgency;
  