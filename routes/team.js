const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Team = require('../models/teamModel');
const team = require('../controllers/team');
router.route('/')
    .get(team.getTeam)
    .post(team.makeTeam)

module.exports = router;