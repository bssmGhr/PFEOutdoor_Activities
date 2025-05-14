// server/routes/contactRoutes.cjs
const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController.cjs'); // Ajustez le chemin

// POST /api/contact/submit
router.post('/submit', submitContactForm);

module.exports = router;
