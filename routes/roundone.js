// express = require('express');
// const router = express.Router();
// const round1 = require('../controllers/roundone/investingRound');
const express = require('express');
const router = express.Router();
const roundOne = require('../controllers/roundone/investingRound');
const { hasRoundOneStarted } = require('../middleware/middleware');
router.route('/')
    .get(hasRoundOneStarted, roundOne.getCards)
    .post(hasRoundOneStarted, roundOne.postInvestment)
module.exports = router;