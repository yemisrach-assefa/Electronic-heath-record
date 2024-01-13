// routes/frontDeskRoutes.js
const express = require('express');
const router = express.Router();
const frontDeskController = require('../controllers/frontDeskController');

// Define routes
router.post('/registerNewPatient', frontDeskController.registerNewPatient);


module.exports = router;
