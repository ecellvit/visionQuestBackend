const express = require('express');
const router = express.Router();
const round1 = require('../controllers/roundone/adminRoutes');
const auth = require('../middleware/authmiddleware');
const assignIndustry = require('../seeds/assignIndustry');
const changeState = require('../seeds/changeState');
const round2 = require('../controllers/roundTwo/adminRoute');
const { hasRoundOneEnded } = require('../middleware/middleware');

router.route('/assignCity')
    .get(round1.getCity)
    .post(round1.assignCity)
router.route('/assignIndustry')
    .get(assignIndustry)

router.route('/changeState')
    .post(changeState)
module.exports = router;