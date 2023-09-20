// express = require('express');
// const router = express.Router();
// const round1 = require('../controllers/roundone/investingRound');
const express = require('express');
const router = express.Router();
const roundOne = require('../controllers/roundone/investingRound');
const auth = require('../middleware/authmiddleware');
router.route('/')
    .get(auth, roundOne.getCards)
    .post(auth, roundOne.postInvestment)
module.exports = router;