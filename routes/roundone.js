// express = require('express');
// const router = express.Router();
// const round1 = require('../controllers/roundone/investingRound');
const express = require('express');
const router = express.Router();
const roundOne = require('../controllers/roundone/investingRound');
const { hasRoundOneStarted } = require('../middleware/middleware');
const auth = require('../middleware/authmiddleware');
router.route('/')
    .get(auth,hasRoundOneStarted, roundOne.getCards)
    .post(auth,hasRoundOneStarted, roundOne.postInvestment)
module.exports = router;