const express = require('express');
const { initializeDatabase } = require('../controllers/initializeDatabaseController');

console.log('Route file loaded'); // Add this log

const router = express.Router();
router.get('/', initializeDatabase);

module.exports = router;
