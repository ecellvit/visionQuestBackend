// express = require('express');
// const router = express.Router();
// const round1 = require('../controllers/roundone/investingRound');
const express = require('express');
const router = express.Router();
const roundOne = require('../controllers/roundone/investingRound');
router.route('/')
    .get(roundOne.getCards)
    .post(roundOne.postInvestment)
module.exports = router;