const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');

router.get('/tests/requests', labController.viewTestRequests);
router.put('/tests/:testId/results', labController.recordTestResults);

module.exports = router;
