const express = require('express');
const { getCombinedData } = require('../controllers/combinedController');

const router = express.Router();

router.get('/', getCombinedData);

module.exports = router;
