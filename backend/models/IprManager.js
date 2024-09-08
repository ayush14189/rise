const mongoose = require('mongoose');

const iprManagerSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String, // Optional, organization they represent
    },
    role: {
      type: String, // Optional, role within the organization (e.g., IPR Manager, IPR Counsel)
    },
    country: {
      type: String,
      required: true, // Required for country-specific IPR laws
    },
    industryFocus: {
      type: String, // Optional, their focus industry (e.g., Tech, Pharmaceuticals, Entertainment)
    },
    yearsOfExperience: {
      type: Number, // Optional, years of experience in IPR
      min: 0,
    },
  },
  { timestamps: true }
);

const IprManager = mongoose.model('IprManager', iprManagerSchema);

module.exports = IprManager;
