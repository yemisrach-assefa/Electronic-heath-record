const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/patients/:patientId', doctorController.viewPatientInformation);


module.exports = router;
