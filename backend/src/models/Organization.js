// backend/src/models/Organization.js
const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subdomain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Organization", organizationSchema);
