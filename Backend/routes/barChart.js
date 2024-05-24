const express = require('express');
const { getBarChart } = require('../controllers/barChartController');

const router = express.Router();

router.get('/', getBarChart);

module.exports = router;
