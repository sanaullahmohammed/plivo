// backend/src/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, organizationName } = req.body;

    const organization = await Organization.create({
      name: organizationName,
      subdomain: organizationName.toLowerCase().replace(/\s+/g, "-"),
    });

    const user = await User.create({
      email,
      password,
      name,
      organizationId: organization._id,
      role: "admin",
    });

    const token = jwt.sign(
      { userId: user._id, organizationId: organization._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, organizationId: user.organizationId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
