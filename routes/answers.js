const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizques');
const catchAsync = require('../utils/catchAsync');
var quesNum = 1;
var score = 0;
router.get(`/questions`, async (req, res, next) => {
    const ques = await Quiz.findOne({ questionNum: quesNum });
    res.render('quiz', { ques });
});

router.post(`/questions`, async (req, res, next) => {
    const ques = await Quiz.findOne({ questionNum: quesNum });
    console.log(req.body.question);
    console.log(JSON.stringify(ques.correctIdxs[0]));
    if (req.body.question === JSON.stringify(ques.correctIdxs[0])) {
        score += 1;
        console.log('perf');
    }
    console.log(score);
    res.render('scores', { score, quesNum });
    quesNum++;
})


module.exports = router;
