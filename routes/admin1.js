const express = require('express');
const router = express.Router();
const round1 = require('../controllers/roundone/adminRoutes');
const auth = require('../middleware/authmiddleware');
const assignIndustry = require('../seeds/assignIndustry');
const changeState = require('../seeds/changeState');
//const round2 = require('../controllers/roundTwo/adminRoute');
const { hasRoundOneEnded } = require('../middleware/middleware');
const catchAsync = require('../utils/catchAsync');
const admin=require('../controllers/admin.js/admin1.js');


router.route('/')
    //.get(round1.getCity)
    .post(admin.qualification)