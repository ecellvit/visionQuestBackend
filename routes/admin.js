const express = require('express');
const router = express.Router();
const round1 = require('../controllers/roundone/assignCity');
const auth = require('../middleware/authmiddleware');
router.route('/')
    .get(round1.getCity)
    .post(round1.assignCity)
module.exports = router;