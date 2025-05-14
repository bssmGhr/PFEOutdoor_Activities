const { JWT_SECRET, database1 } = require("../../serveradmin/config/db");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { adminCollection } = require("../models/adminm.cjs");
// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user
        const admin = await adminCollection.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "admin not found." });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Create a JWT token
        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
            expiresIn: "2h",
        });
        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in.", error });
    }
});


module.exports = router;

