// backend/src/models/Incident.js
const mongoose = require("mongoose");

const incidentUpdateSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["investigating", "identified", "monitoring", "resolved"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["investigating", "identified", "monitoring", "resolved"],
    default: "investigating",
  },
  severity: {
    type: String,
    enum: ["minor", "major", "critical"],
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  affectedServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  updates: [incidentUpdateSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: Date,
});

module.exports = mongoose.model("Incident", incidentSchema);
