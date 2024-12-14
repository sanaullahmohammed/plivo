// backend/src/models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["website", "api", "database"],
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  currentStatus: {
    type: String,
    enum: ["operational", "degraded", "partial_outage", "major_outage"],
    default: "operational",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
