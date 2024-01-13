// routes/staffMemberRoutes.js
const express = require('express');
const router = express.Router();
const staffMemberController = require('../controllers/staffMember');

router.post('/reset-password', staffMemberController.resetPassword);

module.exports = router;