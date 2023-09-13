const Team = require('../../models/teamModel');
const { db } = require('../../models/user');
const catchAsync = require('../../utils/catchAsync');
const { teamValidation } = require('../../schemas');
const AppError = require('../../utils/appError');
const { errorCodes } = require('../../utils/constants');
const User = require('../../models/user');
const { generateTeamToken } = require("./utils");
exports.getTeam = (req, res, next) => {
    res.render('maketeam');
}

exports.makeTeam = catchAsync(async (req, res, next) => {
    const { error } = teamValidation(req.body);
    if (error) {
        return next(
            new AppError(
                error.details[0].message,
                400,
                errorCodes.INPUT_PARAMS_INVALID
            )
        );
    }

    //check whether teamname already taken
    const team_by_name = await Team.findOne({ teamname: req.body.teamname });
    if (team_by_name) {
        return next(
            new AppError("TeamName Already Exists", 412, errorCodes.TEAM_NAME_EXISTS)
        );
    }
    const team_by_number = await Team.findOne({ teamnumber: req.body.teamnumber });
    if (team_by_number) {
        return next(
            new AppError("TeamNumber Already Exists", 412, errorCodes.TEAM_NUMBER_EXISTS)
        );
    };

    const newTeam = await new Team({
        teamname: req.body.teamname,
        teamnumber: req.body.teamnumber,
        Leadername: req.body.Leadername,
        LeaderEmail: req.body.LeaderEmail,
        teamLeaderId: req.user._id,
        vps: 15000,
        score: 0
    }).save();

    res.status(201).json({
        message: "New Team Created Successfully",
        teamId: newTeam._id,
    });
});