const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/staff', adminController.addStaffMember);
router.get('/staff', adminController.viewStaffInformation);

module.exports = router;
