const Team = require('../models/teamModel')

exports.getTeam = (req, res, next) => {
    res.render('maketeam');
}

exports.makeTeam = async (req, res, next) => {
    const newTeam = new Team(req.body);
    const industry = Math.floor(Math.random() * 6) + 1;
    newTeam.industry = industry;
    newTeam.score = 0;
    console.log(newTeam);
    await newTeam.save();
    res.render('return_after_make', { newTeam });
    // res.render('quiz');
};
