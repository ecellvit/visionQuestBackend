const express = require('express');
const router = express.Router();
const round1 = require('../controllers/roundone/adminRoutes');
const auth = require('../middleware/authmiddleware');
const assignIndustry = require('../seeds/assignIndustry');
router.route('/')
    .get(round1.getCity)
    .post(round1.assignCity)
router.route('/assignIndustry')
    .get(assignIndustry)

router.route('/r1start')
    .get(round1.hasStarted)
router.route('/r1end')
    .get(round1.hasEnded)
module.exports = router;