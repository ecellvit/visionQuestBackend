const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const team = require('../controllers/team/team');
const auth = require('../middleware/authmiddleware');
router.route('/')
    .get(team.getTeam)
    .post(team.makeTeam)

module.exports = router;