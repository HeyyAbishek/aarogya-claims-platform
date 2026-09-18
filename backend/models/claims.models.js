const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  claimAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true, // Stores the Cloudinary secure URL
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  approvedAmount: {
    type: Number,
    default: null, // Set by the insurer when approving
  },
  insurerComments: {
    type: String,
    default: "", // Notes left by the insurer during review
  },
});

const Claims = mongoose.model("Claim", claimSchema);
module.exports = Claims;