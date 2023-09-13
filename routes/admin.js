const express = require('express');
const router = express.Router();
const round1 = require('../controllers/roundone/assignCity');
const auth = require('../middleware/authmiddleware');
router.route('/')
    .post(auth, round1.assignCity)
module.exports = router;