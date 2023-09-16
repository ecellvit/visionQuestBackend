const express = require('express');
const router = express.Router();
const score = require('../controllers/scores');
router.route('/')
    .get(score.getVps);

module.exports = router;