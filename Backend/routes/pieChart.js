const express = require('express');
const { getPieChart } = require('../controllers/pieChartController');

const router = express.Router();

router.get('/', getPieChart);

module.exports = router;
